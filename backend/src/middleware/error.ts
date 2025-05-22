import { NextFunction, Request, Response } from 'express';
import { HttpError } from '~/utils/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction) {
  res.status(err.statusCode).json({
    message: err.message || 'Internal Server Error',
  });
}
