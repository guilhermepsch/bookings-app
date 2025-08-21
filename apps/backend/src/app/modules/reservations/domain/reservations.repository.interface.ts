import { Reservation } from './reservation';
import { ReadReservationsDto } from '@bookings-app/shared-types';

export interface IReservationsRepository {
  find(
    dto: ReadReservationsDto
  ): Promise<{ reservations: Reservation[]; total: number }>;

  findById(id: string): Promise<Reservation | null>;

  save(dto: Reservation): Promise<Reservation>;

  update(dto: Reservation): Promise<Reservation>;

  delete(id: string): Promise<void>;
}

export const IReservationsRepositoryToken = Symbol('IReservationsRepository');
