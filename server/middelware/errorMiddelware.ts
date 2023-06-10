import { ErrorRequestHandler } from 'express';

export const errHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error('Uncaught exception', err);
  return res.status(500).send('Opps, an error occurred, please try again');
};
