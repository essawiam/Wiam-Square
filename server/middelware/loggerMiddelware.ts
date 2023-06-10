import { RequestHandler } from 'express';

export const requestMiddelWare: RequestHandler = (req, _res, next) => {
  console.log('Methos = ', req.method, 'Path = ', req.path, 'Body = ', req.body);
  next();
};
