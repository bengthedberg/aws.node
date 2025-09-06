import type { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

interface ValidationError {
  field: string | number | symbol;
  message: string;
}

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);

      req.body = validated;

      next();
    } catch (e) {
      const errors: ValidationError[] = [];
      if (e instanceof ZodError) {
        e.issues.forEach((err) => {
          errors.push({
            field: err.path[0] ?? 'unknown',
            message: err.message
          });
        });
      }
      res.status(400).json({ errors });
    }
  };
}
