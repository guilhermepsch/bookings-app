import { z } from 'zod';
import { ReservationStatus } from '../reservation-constants';
import { PaginationQuerySchema } from '../../../common/schemas/pagination.schema';

export const ReadReservationsSchema = PaginationQuerySchema.extend({
  customer: z.string().uuid().optional(),
  accommodation: z.string().uuid().optional(),
  checkIn: z.date().optional(),
  checkOut: z.date().optional(),
  status: z.enum([ReservationStatus.CONFIRMED, ReservationStatus.CANCELED]).optional(),
});

export type ReadReservationsDto = z.infer<typeof ReadReservationsSchema>;
