import { z } from 'zod';
import { ReservationStatus } from '../reservation-constants';

export const UpdateReservationSchema = z.object({
  status: z.enum([ReservationStatus.CONFIRMED, ReservationStatus.CANCELED]),
});

export type UpdateReservationDto = z.infer<typeof UpdateReservationSchema>;
