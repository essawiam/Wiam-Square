import express, { ErrorRequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { RequestHandler } from 'express-serve-static-core';

import { createPostHandler, listPostHandler } from './handlers/postHandlers';

const app = express();
app.use(express.json());

const requestMiddelWare: RequestHandler = (req, _res, next) => {
  console.log('Methos = ', req.method, 'Path = ', req.path, 'Body = ', req.body);
  next();
};
app.use(requestMiddelWare);

app.get('/posts', asyncHandler(listPostHandler));

app.post('/posts', asyncHandler(createPostHandler));

const errHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error('Uncaught exception', err);
  return res.status(500).send('Opps, an error occurred, please try again');
};
app.use(errHandler);
app.listen(3000);
