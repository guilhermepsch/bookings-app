import { z } from 'zod';
import { ReservationStatus } from '../reservation-constants';

export const CreateReservationSchema = z.object({
  accommodationId: z.string().uuid(),
  checkIn: z.string().date(),
  checkOut: z.string().date(),
  totalPrice: z.number(),
  status: z.enum([ReservationStatus.CONFIRMED, ReservationStatus.CANCELED]),
});

export type CreateReservationDto = z.infer<typeof CreateReservationSchema>;
