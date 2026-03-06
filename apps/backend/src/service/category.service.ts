import prisma from 'prisma/client';
import { PickCreateCategory, PickIDCategory } from '../../../module/@types/category.types';
import { JwtPayload } from '@repo/module';
import { AppContext } from '@/contex';
import { HttpResponse } from '@/http';

class CategoryService {
  public async Create(body: PickCreateCategory, jwtUser: JwtPayload, c: AppContext) {
    try {
      const query = await prisma.category.create({
        data: {
          desc: body.desc,
          title: body.title,
          avatarCategoryUrl: body.avatarCategoryUrl,
          userId: jwtUser.id,
        },
      });

      if (!query) {
        return HttpResponse(c).badRequest();
      }

      return query;
    } catch (error) {
      return HttpResponse(c).badGateway();
    }
  }
  public async Update(body: PickCreateCategory, id: PickIDCategory, c: AppContext) {
    try {
      const query = await prisma.category.update({
        where: {
          id: id.id,
        },
        data: {
          avatarCategoryUrl: body.avatarCategoryUrl,
          title: body.title,
          desc: body.desc,
        },
      });

      if (!query) {
        return HttpResponse(c).badRequest();
      }

      return query;
    } catch (error) {
      return HttpResponse(c).badGateway();
    }
  }
}

export default new CategoryService();
