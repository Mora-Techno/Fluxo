import { Elysia, t } from 'elysia';
import AuthController from '@/controllers/AuthController';
import { AppContext } from '@/contex';
import { verifyToken } from '@/middlewares/auth';

class AuthRouter {
  public authRouter;

  constructor() {
    this.authRouter = new Elysia({ prefix: '/auth' }).derive(() => ({
      json(data: any, status = 200) {
        return new Response(JSON.stringify(data), {
          status,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    }));
    this.routes();
  }

  private routes() {
    this.authRouter.post('/', (c: AppContext) => AuthController.login(c), {
      body: t.Object({
        email: t.Optional(t.String({ format: 'email' })),
        phone: t.Optional(t.String()),
        password: t.Required(t.String()),
      }),
      detail: {
        tags: ['Auth'],
        description: 'Login With Email & Phone',
      },
    });
    this.authRouter.post('/register', (c: AppContext) => AuthController.register(c), {
      body: t.Object({
        email: t.Optional(t.String({ format: 'email' })),
        phone: t.Optional(t.String()),
        first_name: t.Required(t.String()),
        last_name: t.Required(t.String()),
        password: t.Required(t.String()),
        role: t.Required(t.Union([t.Literal('user'), t.Literal('admin')])),
      }),
      detail: {
        tags: ['Auth'],
        description: 'Register With Email & Phone',
      },
    });
    this.authRouter.post('/logout', (c: AppContext) => AuthController.logout(c), {
      beforeHandle: [verifyToken().beforeHandle],
      body: t.Object({}),
      detail: {
        tags: ['Auth'],
        description: 'Logout Application',
      },
    });
    this.authRouter.post('/forgot', (c: AppContext) => AuthController.forgotPassword(c), {
      body: t.Object({
        email: t.Optional(t.String({ format: 'email' })),
        phone: t.Optional(t.String()),
      }),
      detail: {
        tags: ['Auth'],
        description: 'Forgot Password Application',
      },
    });

    this.authRouter.post('/verifyOtp', (c: AppContext) => AuthController.verifyOtp(c), {
      body: t.Object({
        email: t.Optional(t.String({ format: 'email' })),
        phone: t.Optional(t.String()),
        otp: t.Required(t.String()),
      }),
      detail: {
        tags: ['Auth'],
        description: 'Verify Otp',
      },
    });
    this.authRouter.post('/resend', (c: AppContext) => AuthController.resendOtp(c), {
      body: t.Object({
        email: t.Optional(t.String({ format: 'email' })),
        phone: t.Optional(t.String()),
      }),
    });
    this.authRouter.post('/reset-password', (c: AppContext) => AuthController.resetPassword(c), {
      body: t.Object({
        password: t.Required(t.String()),
      }),
    });
  }
}

export default new AuthRouter().authRouter;
