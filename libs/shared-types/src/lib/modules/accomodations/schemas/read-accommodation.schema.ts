import { z } from 'zod';
import { PaginationQuerySchema } from '../../../common/schemas/pagination.schema';
import { AccommodationStatus } from '../accomodation-constants';

export const ReadAccommodationSchema = PaginationQuerySchema.extend({
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
  userId: z.string().uuid().optional(),
});

export type ReadAccommodationDto = z.infer<typeof ReadAccommodationSchema>;
