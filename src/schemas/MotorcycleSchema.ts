import { z } from 'zod';
import VehicleZodSchema from './VehicleSchema';

const MotorcycleInfo = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().min(1).max(2500).int(),
});

const MotorcycleZodSchema = VehicleZodSchema.merge(MotorcycleInfo);

export default MotorcycleZodSchema;