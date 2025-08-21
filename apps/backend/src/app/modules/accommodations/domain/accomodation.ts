import { AccommodationStatus } from '@bookings-app/shared-types';

export class Accommodation {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly description: string,
    public readonly capacity: number,
    public readonly streetType: string,
    public readonly street: string,
    public readonly number: string,
    public readonly district: string,
    public readonly city: string,
    public readonly state: string,
    public readonly complement: string,
    public readonly zipCode: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly pricePerNight: number,
    public readonly status: AccommodationStatus,
    public readonly userId: string,
    public readonly reservationIds: string[] = [],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
