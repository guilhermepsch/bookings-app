import { Accommodation } from './accomodation';
import { ReadAccommodationDto } from '@bookings-app/shared-types';

export interface IAccommodationsRepository {
  create(accommodation: Accommodation): Promise<Accommodation>;
  update(accommodation: Accommodation): Promise<Accommodation>;
  findById(id: string): Promise<Accommodation>;
  findAll(query: ReadAccommodationDto): Promise<{ accommodations: Accommodation[]; total: number }>;
  delete(id: string): Promise<void>;
}

export const IAccommodationsRepositoryToken = Symbol('IAccommodationsRepository');
