import { NextFunction, Request, Response } from 'express';
import CarZodSchema from '../schemas/CarSchema';

const carValidate = (req: Request, _res: Response, next: NextFunction) => {
  const parsed = CarZodSchema.safeParse(req.body);

  if (!parsed.success) {
    throw parsed.error;
  }

  next();
};

export default carValidate;