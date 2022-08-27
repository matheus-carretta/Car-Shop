import { NextFunction, Request, Response } from 'express';
import MotorcycleZodSchema from '../schemas/MotorcycleSchema';

const motorcycleValidate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const parsed = MotorcycleZodSchema.safeParse(req.body);

  if (!parsed.success) {
    throw parsed.error;
  }

  next();
};

export default motorcycleValidate;