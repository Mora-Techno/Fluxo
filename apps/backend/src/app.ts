import Elysia from 'elysia';
import cors from '@elysiajs/cors';
import authRouter from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { InternalApiKey } from './middlewares/apiKey';
import swaggerPlugin from './swagger';
import { helmet } from 'elysia-helmet';
class App {
  public app: Elysia;

  constructor() {
    this.app = new Elysia();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app
      .use(cors({ origin: '*' }))
      .use(swaggerPlugin)
      .use(helmet());
  }

  private routes(): void {
    this.app.get('/', () => 'Hello Fluxo API');

    this.app.group('/api', (api) => api.use(InternalApiKey).use(authRouter).use(categoryRoutes));
  }
}

export default new App().app;
