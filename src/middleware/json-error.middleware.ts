import type { Request, Response, NextFunction } from 'express';

export function jsonErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON format',
      message: 'Request body contains malformed JSON'
    });
  }
  next(err);
}
