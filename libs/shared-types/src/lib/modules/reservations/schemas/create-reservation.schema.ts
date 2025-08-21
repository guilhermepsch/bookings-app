import { z } from 'zod';
import { ReservationStatus } from '../reservation-constants';

export const CreateReservationSchema = z.object({
  userId: z.string().uuid(),
  accommodationId: z.string().uuid(),
  checkIn: z.date(),
  checkOut: z.date(),
  totalPrice: z.number(),
  status: z.enum([ReservationStatus.CONFIRMED, ReservationStatus.CANCELED]),
});

export type CreateReservationDto = z.infer<typeof CreateReservationSchema>;
