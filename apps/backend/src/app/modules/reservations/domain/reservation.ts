import { ReservationStatus } from '@bookings-app/shared-types';

export class Reservation {
  constructor(
    public readonly id: string,
    public readonly clientId: string,
    public readonly accommodationId: string,
    public readonly checkIn: Date,
    public readonly checkOut: Date,
    public readonly totalPrice: number,
    public readonly status: ReservationStatus,
  ) {}
}
