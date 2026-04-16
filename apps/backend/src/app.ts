import Elysia from 'elysia';
import cors from '@elysiajs/cors';
import authRouter from './routes/authRoutes';

import swagger from '@elysiajs/swagger';

class App {
  public app: Elysia;

  constructor() {
    this.app = new Elysia();
    this.middlewares();
    this.routes();
  }
  private routes(): void {
    this.app.get('/', () => 'Hello Elysia! Bun js');
  }
  private middlewares() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(
      swagger({
        path: '/doc',
        documentation: {
          info: {
            title: 'Fluxo Backend Api Hybrid',
            version: 'v1.0',
            description: 'API documentation for Fluxo App',
          },
          tags: [{ name: 'Auth', description: 'Authentication endpoints' }],
        },
      }),
    );
    this.app.group('/api', (api) => api.use(authRouter));
  }
}

export default new App().app;
