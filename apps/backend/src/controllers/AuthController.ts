import bcryptjs from 'bcryptjs';

import { JwtPayload, PickResetPassword } from '@repo/shared';
import prisma from 'prisma/client';
import { AppContext } from '@/contex/index';
import { generateOtp } from '@/utils/generate-otp';
import { sendOTPEmail } from '@/utils/sendOTP';
import { OAuth2Client } from 'google-auth-library';
import { env } from '@/config/env.config';
import { sanitizeUser } from '@/utils/sanitize';
import { HttpResponse } from '@/http';
import authService from '@/service/auth.service';

// const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

class AuthController {
  public async register(c: AppContext) {
    try {
      const serive = await authService.RegisterService(c);

      if (!serive) {
        return HttpResponse(c).badGateway();
      }

      return HttpResponse(c).created(serive, 'successfully create users');
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }

  public async addUsername(c: AppContext) {
    try {
      const users = c.user as JwtPayload;

      if (!users) {
        return HttpResponse(c).unauthorized();
      }

      const service = await authService.addUsernameService(c, users.id);

      if (!service) {
        return HttpResponse(c).badGateway();
      }

      return HttpResponse(c).ok(service);
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
      const users = c.user as JwtPayload;

      if (!users) {
        return HttpResponse(c).unauthorized();
      }

      const service = await authService.LogoutService(c, users.id);

      if (!service) {
        return HttpResponse(c).badGateway();
      }

      return HttpResponse(c).ok(service, 'Account logged out successfully');
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }
  public async forgotPassword(c: AppContext) {
    try {
      const service = await authService.forgotPasswordService(c);

      if (!service) {
        return HttpResponse(c).badGateway();
      }

      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
  public async verifyOtp(c: AppContext) {
    try {
      const service = await authService.VerifyOtpService(c);
      if (!service) {
        return HttpResponse(c).badRequest('Service bad request');
      }

      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async resendOtp(c: AppContext) {
    try {
      const service = await authService.ResendOtpService(c);

      if (!service) {
        HttpResponse(c).badRequest('service bad requets');
      }
      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
  public async resetPassword(c: AppContext) {
    try {
      const service = await authService.ResetPasswordService(c);
      if (!service) {
        return HttpResponse(c).badRequest();
      }
      return HttpResponse(c).ok(service);
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
}

export default new AuthController();
