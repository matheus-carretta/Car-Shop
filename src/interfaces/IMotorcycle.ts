import { z } from 'zod';
import MotorcycleZodSchema from '../schemas/MotorcycleSchema';

export type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;