import { Accommodation } from './accomodation';

export interface IAccommodationsRepository {
  create(accommodation: Accommodation): Promise<Accommodation>;
  findById(id: string): Promise<Accommodation>;
  update(accommodation: Accommodation): Promise<Accommodation>;
  findAll(): Promise<Accommodation[]>;
  delete(id: string): Promise<void>;
}

export const IAccommodationsRepositoryToken = Symbol('IAccommodationsRepository');
