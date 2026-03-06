import { AppContext } from '@/contex';
import CategoryController from '@/controllers/CategoryController';
import { verifyToken } from '@/middlewares/auth';
import Elysia from 'elysia';

class CategoryRouter {
  public categoryRouter;

  constructor() {
    this.categoryRouter = new Elysia({ prefix: '/category' }).derive(() => ({
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
    this.categoryRouter.post('/', (c: AppContext) => CategoryController.CreateCategory(c), {
      beforeHandle: [verifyToken().beforeHandle],
    });
    this.categoryRouter.put('/:id', (c: AppContext) => CategoryController.UpdateCategory(c), {
      beforeHandle: [verifyToken().beforeHandle],
    });
  }
}

export default new CategoryRouter().categoryRouter;
