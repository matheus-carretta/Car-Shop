import { z } from 'zod';
import VehichleSchema from '../schemas/VehicleSchema';

export type IVehicle = z.infer<typeof VehichleSchema>;
