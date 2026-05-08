import { AppContext } from '@/contex';
import { HttpResponse } from '@/http';
import { JwtPayload, PickLogin, PickRegister } from '@repo/shared';
import prisma from 'prisma/client';
import bcryptjs from 'bcryptjs';
import { generateOtp } from '@/utils/generate-otp';
import { sendOTPEmail } from '@/utils/mailer';
import jwt from 'jsonwebtoken';
import { sanitizeUser } from '@/utils/sanitize';

class AuthService {
  public async RegisterService(c: AppContext) {
    try {
      const auth = c.body as PickRegister;
      const { email, phone } = auth;
      if (!auth.first_name || !auth.last_name || !auth.password) {
        return c.json?.({ status: 400, message: 'All fields are required' }, 400);
      }

      if (!auth.email && !auth.phone) {
        return HttpResponse(c).unauthorized();
      }

      const isAlreadyRegistered = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      if (isAlreadyRegistered) {
        return HttpResponse(c).badRequest('Email and Phone already registered');
      }

      const hashedPassword = await bcryptjs.hash(auth.password, 10);
      let newUsers;

      if (auth.email) {
        const otp = generateOtp(6);
        const otpExpiress = new Date(Date.now() + 5 * 60 * 1000);
        newUsers = await prisma.user.create({
          data: {
            first_name: auth.first_name,
            last_name: auth.last_name,
            password: hashedPassword,
            role: auth.role || 'USER',
            email: auth.email,
            username: '',
            phone: auth.phone ?? '',
            otp: otp,
            expOtp: otpExpiress,
            isVerify: false,
          },
        });

        await sendOTPEmail(email, otp);
        return HttpResponse(c).created(newUsers, 'Register With Email');
      }
      if (auth.phone) {
        newUsers = await prisma.user.create({
          data: {
            first_name: auth.first_name,
            last_name: auth.last_name,
            password: hashedPassword,
            email: auth.email ?? '',
            phone: phone,
            username: '',
            role: auth.role || 'USER',
            isVerify: true,
          },
        });
        return HttpResponse(c).created(newUsers, 'Register With Phone');
      }

      return newUsers;
    } catch (error) {
      return HttpResponse(c).internalError();
    }
  }

  public async LoginService(c: AppContext) {
    try {
      const auth = c.body as PickLogin;
      const { email, phone, username } = auth;

      if (!auth.password) {
        return HttpResponse(c).notFound('password not found');
      }

      if (!auth.email && !auth.phone && !auth.username) {
        return HttpResponse(c).badRequest('email, phone & username is required');
      }

      const selectLogin = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }, { username }],
        },
      });

      if (!selectLogin) {
        return HttpResponse(c).badRequest();
      }

      if (!selectLogin.isVerify) {
        return HttpResponse(c).badRequest('account not verify');
      }

      const validatePassword = await bcryptjs.compare(auth.password, selectLogin.password!);
      if (!validatePassword) {
        return HttpResponse(c).badRequest();
      }

      await prisma.userSession.deleteMany({
        where: {
          userId: selectLogin.id,
        },
      });

      const ipAddress =
        c.headers['x-forwarded-for']?.split(',')[0] ||
        c.headers['x-real-ip'] ||
        c.headers['cf-connecting-ip'] ||
        'unknown';

      const session = await prisma.userSession.create({
        data: {
          userId: selectLogin.id,
          userAgent: c.headers['user-agent'] ?? 'unknown',
          ipAddress: ipAddress,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      const payload: JwtPayload = {
        id: selectLogin.id,
        sessionId: session.id,
        role: selectLogin.role,
      };
      if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      await prisma.user.update({
        where: { id: selectLogin.id },
        data: { token },
      });

      const buildRespone = { ...sanitizeUser(selectLogin), token };

      return { buildRespone };
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
}

export default new AuthService();
