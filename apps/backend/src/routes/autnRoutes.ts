import Elysia from 'elysia';
import AuthController from '@/controllers/AuthController';
import { AppContext } from '@/contex';
import { verifyToken } from '@/middlewares/auth';

class AuthRouter {
  public authRouter;

  constructor() {
    this.authRouter = new Elysia({ prefix: '/auth' });
    this.routes();
  }

  private routes() {
    this.authRouter.post('/login', (c: AppContext) => AuthController.login(c));
    this.authRouter.post('/', (c: AppContext) => AuthController.register(c));
    this.authRouter.post('/logout', (c: AppContext) => AuthController.logout(c), {
      beforeHandle: [verifyToken().beforeHandle],
    });
    this.authRouter.post('/forgot', (c: AppContext) => AuthController.forgotPassword(c));

    this.authRouter.post('/verifyOtp', (c: AppContext) => AuthController.verifyOtp(c));
    this.authRouter.post('/resend', (c: AppContext) => AuthController.resendOtp(c));
    this.authRouter.post('/reset-password', (c: AppContext) => AuthController.resetPassword(c));
  }
}

export default new AuthRouter().authRouter;
