import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routes';

export function createServer() {
  const app = express();

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
    })
  );

  return app;
}