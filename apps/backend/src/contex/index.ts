import type { Context } from 'elysia';
import type { JwtPayload } from '@repo/module';
import { AppFile } from '@/types/appType';

export interface AppContext extends Context {
  user?: JwtPayload;
  json?: (data: any, status?: number) => Response;
  files?: Record<string, AppFile[]>;
}

export type ElysiaHandler = (c: AppContext) => Promise<Response | void> | Response | void;
export type ElysiaMiddleware = (c: AppContext) => Promise<void | Response> | void | Response;
