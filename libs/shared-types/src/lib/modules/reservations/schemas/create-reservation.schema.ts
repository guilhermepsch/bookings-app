import { z } from 'zod';
import { ReservationStatus } from '@bookings-app/shared-types';

// export class Reservation {
//   constructor(
//     public readonly id: string,
//     public readonly customer: string,
//     public readonly accommodationId: string,
//     public readonly checkIn: Date,
//     public readonly checkOut: Date,
//     public readonly totalPrice: number,
//     public readonly status: ReservationStatus,
//     public readonly createdAt: Date,
//     public readonly updatedAt: Date
//   ) {}
// }


export const CreateReservationSchema = z.object({
  customer: z.string().uuid(),
  accommodationId: z.string().uuid(),
  checkIn: z.date(),
  checkOut: z.date(),
  totalPrice: z.number(),
  status: z.enum([ReservationStatus.CONFIRMED, ReservationStatus.CANCELED]),
});
