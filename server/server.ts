import express from 'express';
import asyncHandler from 'express-async-handler';

import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandlers';
import { createPostHandler, listPostHandler } from './handlers/postHandlers';
import { errHandler } from './middelware/errorMiddelware';
import { requestMiddelWare } from './middelware/loggerMiddelware';

(async () => {
  await initDb();
  const app = express();
  app.use(express.json());

  app.use(requestMiddelWare);

  app.use(errHandler);
  // Post
  app.get('/v1/posts', asyncHandler(listPostHandler));
  app.post('/v1/posts', asyncHandler(createPostHandler));

  // User
  app.post('/v1/signup', asyncHandler(signUpHandler));
  app.post('/v1/signin', asyncHandler(signInHandler));

  app.listen(3000);
})();
