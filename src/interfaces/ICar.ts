import { z } from 'zod';
import CarZodSchema from '../schemas/CarSchema';

export type ICar = z.infer<typeof CarZodSchema>;