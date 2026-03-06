import { AppContext } from '@/contex';
import { HttpResponse } from '@/http';

export function ErrorHandling(c: AppContext, error: unknown) {
  console.error(error);
  return HttpResponse(c).internalError(error);
}
