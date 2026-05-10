import { AppContext } from '@/contex';
import { HttpResponse } from '@/http';
import {
  JwtPayload,
  PickForgotPassword,
  PickLogin,
  PickRegister,
  PickResetPassword,
  PickSendOtp,
  PickUsername,
  PickVerify,
} from '@repo/shared';
import prisma from 'prisma/client';
import bcryptjs from 'bcryptjs';
import { generateOtp } from '@/utils/generate-otp';
import { sendOTPEmail } from '@/utils/sendOTP';
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
            role: auth.role || 'user',
            email: auth.email,
            username: '',
            phone: auth.phone ?? '',
            otp: otp,
            expOtp: otpExpiress,
            isVerify: false,
          },
        });

        await sendOTPEmail(email, otp);
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
            role: auth.role || 'user',
            isVerify: true,
          },
        });
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
          userID: selectLogin.id,
        },
      });

      const ipAddress =
        c.headers['x-forwarded-for']?.split(',')[0] ||
        c.headers['x-real-ip'] ||
        c.headers['cf-connecting-ip'] ||
        'unknown';

      const session = await prisma.userSession.create({
        data: {
          userID: selectLogin.id,
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
  public async LogoutService(c: AppContext, id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
          id: true,
        },
      });

      if (!user) {
        return HttpResponse(c).notFound();
      }

      const session = await prisma.userSession.findFirst({
        where: {
          userID: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!session) {
        return HttpResponse(c).notFound();
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { token: null },
      });

      await prisma.userSession.delete({
        where: {
          id: session.id,
          userId: user.id,
        },
      });
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
  public async forgotPasswordService(c: AppContext) {
    try {
      const auth = c.body as PickForgotPassword;
      const { email, phone, username } = auth;
      if (!auth.email && !auth.phone) {
        return HttpResponse(c).badRequest('email & phone request');
      }
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }, { username }].filter(Boolean),
        },
      });

      if (!user) {
        return HttpResponse(c).notFound('email & phone not found');
      }
      let result;
      const otp = generateOtp(6);
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

      if (user.email) {
        await sendOTPEmail(user.email, otp);
        result = await prisma.user.update({
          where: { id: user.id },
          data: { otp, expOtp: otpExpires },
        });
      } else {
        result = user;
      }

      return result;
    } catch (error) {
      return HttpResponse(c).internalError();
    }
  }
  public async addUsernameService(c: AppContext, id: string) {
    try {
      const body = c.body as PickUsername;

      if (!body) {
        return HttpResponse(c).notFound();
      }

      const update = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username: body.username,
        },
      });

      if (!update) {
        return HttpResponse(c).badGateway();
      }
      return update;
    } catch (error) {
      HttpResponse(c).internalError(error);
    }
  }
  public async VerifyOtpService(c: AppContext) {
    try {
      const auth = c.body as PickVerify;
      if (!auth.email || !auth.otp) {
        return HttpResponse(c).notFound();
      }
      const user = await prisma.user.findFirst({
        where: {
          email: auth.email,
          otp: auth.otp,
        },
      });

      if (!user) {
        return HttpResponse(c).badRequest();
      }

      if (user.expOtp && new Date() > new Date(user.expOtp)) {
        return HttpResponse(c).badRequest('OTP has expired. Please request a new one.');
      }

      const verifyUser = await prisma.user.update({
        where: { id: user!.id },
        data: { isVerify: true, otp: null, expOtp: null },
      });

      return verifyUser;
    } catch (error) {
      return HttpResponse(c).internalError(c);
    }
  }
  public async ResendOtpService(c: AppContext) {
    try {
      const auth = c.body as PickSendOtp;
      if (!auth.email) {
        return HttpResponse(c).notFound('email not found');
      }
      const user = await prisma.user.findFirst({
        where: {
          email: auth.email,
        },
      });

      if (!user) {
        return HttpResponse(c).notFound('accout not found');
      }

      const otp = generateOtp(6);
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

      const newOtp = await prisma.user.update({
        where: { id: user.id },
        data: { otp: otp, expOtp: otpExpires },
      });

      await sendOTPEmail(auth.email, otp);

      return newOtp;
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
  public async ResetPasswordService(c: AppContext) {
    try {
      const auth = c.body as PickResetPassword;
      const { email, phone, username } = auth;
      if (!auth.password) {
        return HttpResponse(c).notFound('new password no fond');
      }
      if (!auth.email && !auth.phone && !auth.username) {
        return HttpResponse(c).badRequest('body request');
      }

      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }, { username }],
        },
      });
      if (!user) {
        return HttpResponse(c).notFound('Account not found ');
      }
      if (!user.isVerify) {
        return HttpResponse(c).badRequest('Account not verified');
      }

      const hashedPassword = await bcryptjs.hash(auth.password, 10);

      const newPassword = await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return newPassword;
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
}

export default new AuthService();
