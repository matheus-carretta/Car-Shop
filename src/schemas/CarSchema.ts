import { z } from 'zod';
import VehicleZodSchema from './VehicleSchema';

const CarInfo = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

const CarZodSchema = VehicleZodSchema.merge(CarInfo);

export default CarZodSchema;