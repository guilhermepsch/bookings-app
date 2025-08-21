import { z } from 'zod';
import { AccommodationStatus } from '../accomodation-constants';

export const CreateAccommodationSchema = z.object({
  type: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  capacity: z.number(),
  streetType: z.string().min(1).max(255),
  street: z.string().min(1).max(255),
  number: z.string().min(1).max(255),
  district: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  state: z.string().min(1).max(255),
  complement: z.string().min(1).max(255),
  zipCode: z.string().min(1).max(255),
  latitude: z.number(),
  longitude: z.number(),
  pricePerNight: z.number(),
  status: z.enum([
    AccommodationStatus.ACTIVE,
    AccommodationStatus.INACTIVE,
    AccommodationStatus.MAINTENANCE,
  ]),
  userId: z.string().uuid().optional(),
});

export type CreateAccomodationDto = z.infer<typeof CreateAccommodationSchema>;
