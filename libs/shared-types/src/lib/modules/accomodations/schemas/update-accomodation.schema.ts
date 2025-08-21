import { z } from 'zod';
import { AccommodationStatus } from '../accomodation-constants';

export const UpdateAccommodationSchema = z.object({
  type: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  capacity: z.number().optional(),
  streetType: z.string().min(1).max(255).optional(),
  street: z.string().min(1).max(255).optional(),
  number: z.string().min(1).max(255).optional(),
  district: z.string().min(1).max(255).optional(),
  city: z.string().min(1).max(255).optional(),
  state: z.string().min(1).max(255).optional(),
  complement: z.string().min(1).max(255).optional(),
  zipCode: z.string().min(1).max(255).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  pricePerNight: z.number().optional(),
  status: z
    .enum([
      AccommodationStatus.ACTIVE,
      AccommodationStatus.INACTIVE,
      AccommodationStatus.MAINTENANCE,
    ])
    .optional(),
});

export type UpdateAccommodationDto = z.infer<typeof UpdateAccommodationSchema>;
