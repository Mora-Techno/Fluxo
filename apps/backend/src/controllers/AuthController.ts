import bcryptjs from 'bcryptjs';

import {
  PickRegister,
  PickLogin,
  JwtPayload,
  PickForgotPassword,
  PickVerify,
  PickSendOtp,
  PickResetPassword,
} from '@repo/shared';
import prisma from 'prisma/client';
import { AppContext } from '@/contex/index';
import { generateOtp } from '@/utils/generate-otp';
import { sendOTPEmail } from '@/utils/mailer';
import { OAuth2Client } from 'google-auth-library';
import { env } from '@/config/env.config';
import { sanitizeUser } from '@/utils/sanitize';
import { HttpResponse } from '@/http';

// const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

class AuthController {
  public async register(c: AppContext) {
    try {
      const auth = c.body as PickRegister;
      const { email, phone } = auth;
      if (!auth.first_name || !auth.last_name || !auth.password) {
        return c.json?.({ status: 400, message: 'All fields are required' }, 400);
      }

      if (!auth.email && !auth.phone) {
        return HttpResponse(c).badRequest();
      }

      const isAlreadyRegistered = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      if (!service) {
        return HttpResponse(c).badGateway('service bad gateway');
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
            phone: auth.phone ?? '',
            otp: otp,
            expOtp: otpExpiress,
            isVerify: false,
          },
        });
        await sendOTPEmail(email, otp);
        return HttpResponse(c).created('Create new user using email');
      }
      if (phone) {
        newUsers = await prisma.user.create({
          data: {
            first_name: auth.first_name,
            last_name: auth.last_name,
            password: hashedPassword,
            email: auth.email ?? '',
            phone: phone,
            role: auth.role || 'USER',
            isVerify: true,
          },
        });
        return HttpResponse(c).created('Create new user using phone');
      }
      return HttpResponse(c).badRequest('Invalid register request');
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }
  //  add endpoint username

  public async addUsername(c: AppContext) {
    try {
      //
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
  public async login(c: AppContext) {
    try {
      const service = await authService.LoginService(c);

      if (!service) {
        return HttpResponse(c).badGateway();
      }

      return HttpResponse(c).ok(service);
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }

  public async logout(c: AppContext) {
    try {
      const auth = c.user as JwtPayload;

      if (!auth?.id) {
        return c.json?.({ status: 401, message: 'Unauthorized' }, 401);
      }

      const user = await prisma.user.findUnique({
        where: { id: auth.id },
        select: {
          id: true,
        },
      });

      if (!user) {
        return c.json?.({ status: 404, message: 'Account not found' }, 404);
      }

      const session = await prisma.userSession.findFirst({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!session) {
        return c.json?.(
          {
            status: 404,
            message: 'session not found',
          },
          404,
        );
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

      return HttpResponse(c).ok('Account logged out successfully');
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: 'Internal server error',
          error: error instanceof Error ? error.message : error,
        },
        500,
      );
    }
  }
  public async forgotPassword(c: AppContext) {
    try {
      const auth = c.body as PickForgotPassword;
      const { email, phone } = auth;
      if (!auth.email && !auth.phone) {
        return c.json?.(
          {
            status: 400,
            message: 'Email Required',
          },
          400,
        );
      }
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      if (!user) {
        return c.json?.(
          {
            status: 404,
            message: 'Email & Phone Not Found',
          },
          404,
        );
      }
      let newForgot;
      if (email) {
        const otp = generateOtp(6);
        const otpExpiress = new Date(Date.now() + 5 * 60 * 1000);
        await sendOTPEmail(auth.email, otp);

        newForgot = await prisma.user.update({
          where: {
            email: auth.email,
          },
          data: {
            otp: otp,
            expOtp: otpExpiress,
          },
        });

        return c.json?.(
          {
            status: 200,
            data: newForgot,
            message: 'successfully found email',
          },
          200,
        );
      }
      if (phone) {
        newForgot = await prisma.user.findFirst({
          where: {
            phone: phone,
          },
        });
        return c.json?.(
          {
            status: 200,
            message: 'successfully found phone',
            data: newForgot ?? null,
          },
          200,
        );
      }
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: 'Server Internal Error',
          error: error instanceof Error ? error.message : error,
        },
        500,
      );
    }
  }
  public async verifyOtp(c: AppContext) {
    try {
      const auth = c.body as PickVerify;
      if (!auth.email || !auth.otp) {
        return c.json?.(
          {
            status: 400,
            message: 'Email & Otp requaired',
          },
          400,
        );
      }
      const user = await prisma.user.findFirst({
        where: {
          email: auth.email,
          otp: auth.otp,
        },
      });

      if (!user) {
        return c.json?.(
          {
            status: 404,
            message: 'Email or OTP Not Found / OTP Failed',
          },
          404,
        );
      }

      if (user.expOtp && new Date() > new Date(user.expOtp)) {
        return c.json?.(
          {
            status: 400,
            message: 'OTP has expired. Please request a new one.',
          },
          400,
        );
      }

      const updateUser = await prisma.user.update({
        where: { id: user!.id },
        data: { isVerify: true, otp: null, expOtp: null },
      });

      return c.json?.(
        {
          status: 200,
          message: 'OTP verified successfully',
          data: updateUser,
        },
        200,
      );
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: 'Server Internal Error',
          error: error instanceof Error ? error.message : error,
        },
        500,
      );
    }
  }

  public async resendOtp(c: AppContext) {
    try {
      const auth = c.body as PickSendOtp;
      if (!auth.email) {
        return c.json?.(
          {
            status: 400,
            message: 'Email is required',
          },
          400,
        );
      }
      const user = await prisma.user.findFirst({
        where: {
          email: auth.email,
        },
      });

      if (!user) {
        return c.json?.(
          {
            status: 404,
            message: 'Account Not Found',
          },
          404,
        );
      }

      const otp = generateOtp(6);
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

      const newOtp = await prisma.user.update({
        where: { id: user.id },
        data: { otp: otp, expOtp: otpExpires },
      });

      await sendOTPEmail(auth.email, otp);

      return c.json?.(
        {
          status: 200,
          message: 'OTP resent successfully',
          data: newOtp,
        },
        200,
      );
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: 'Server Internal Error',
          error: error instanceof Error ? error.message : error,
        },
        500,
      );
    }
  }
  public async resetPassword(c: AppContext) {
    try {
      const auth = c.body as PickResetPassword;
      const { email, phone } = auth;
      if (!auth.password) {
        return c.json?.(
          {
            status: 400,
            message: 'New password is required',
          },
          400,
        );
      }
      if (!auth.email && !auth.phone) {
        return c.json?.(
          {
            status: 400,
            message: 'email or phone is required',
          },
          400,
        );
      }

      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });
      if (!user) {
        return c.json?.(
          {
            status: 404,
            message: 'Account not found',
          },
          404,
        );
      }
      if (!user.isVerify) {
        return c.json?.(
          {
            status: 400,
            message: 'Account not verified',
          },
          400,
        );
      }

      const hashedPassword = await bcryptjs.hash(auth.password, 10);

      const newPassword = await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return c.json?.(
        {
          status: 200,
          message: 'Password reset successfully',
          data: newPassword,
        },
        200,
      );
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: 'Server Internal Error',
          error: error instanceof Error ? error.message : error,
        },
        500,
      );
    }
  }
}

export default new AuthController();
