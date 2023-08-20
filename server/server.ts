import * as dotenv from 'dotenv';
import express from 'express';
import asyncHandler from 'express-async-handler';

import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandlers';
import { createPostHandler, listPostHandler } from './handlers/postHandlers';
import { authMiddleware } from './middelware/authMiddelware';
import { errHandler } from './middelware/errorMiddelware';
import { requestMiddelWare } from './middelware/loggerMiddelware';

(async () => {
  await initDb();
  dotenv.config();
  const app = express();
  app.use(express.json());

  app.use(requestMiddelWare);

  app.use(errHandler);
  // Public endpoints
  app.get('/healthz', (_req, res) => res.send({ status: 'Okay' }));
  app.post('/v1/signup', asyncHandler(signUpHandler));
  app.post('/v1/signin', asyncHandler(signInHandler));

  app.use(authMiddleware);

  // Protected endpoints
  app.get('/v1/posts', asyncHandler(listPostHandler));
  app.post('/v1/posts', asyncHandler(createPostHandler));

  app.listen(3000);
})();
