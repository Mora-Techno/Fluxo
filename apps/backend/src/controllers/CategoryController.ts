import { AppContext } from '@/contex';
import { ErrorHandling } from '@/error';
import { HttpResponse } from '@/http';
import { JwtPayload } from '@repo/module';
import { PickCreateCategory, PickIDCategory } from '../../../module/@types/category.types';
import categoryService from '@/service/category.service';

class CategoryController {
  public async CreateCategory(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      const body = c.body as PickCreateCategory;
      if (!jwtUser) {
        return HttpResponse(c).unauthorized();
      }

      if (!body.desc || !body.title) {
        return HttpResponse(c).badRequest();
      }

      const queryService = await categoryService.Create(body, jwtUser, c);

      if (!queryService) {
        return HttpResponse(c).badRequest();
      }

      return HttpResponse(c).created(queryService);
    } catch (error) {
      return ErrorHandling(c, error);
    }
  }
  public async UpdateCategory(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      const body = c.body as PickCreateCategory;
      const params = c.params as PickIDCategory;

      if (!params) {
        return HttpResponse(c).badRequest();
      }
      if (!jwtUser) {
        return HttpResponse(c).unauthorized();
      }
      const queryService = await categoryService.Update(body, params, c);

      if (!queryService) {
        return HttpResponse(c).badRequest();
      }

      return HttpResponse(c).ok(queryService);
    } catch (error) {
      return ErrorHandling(c, error);
    }
  }
}

export default new CategoryController();
