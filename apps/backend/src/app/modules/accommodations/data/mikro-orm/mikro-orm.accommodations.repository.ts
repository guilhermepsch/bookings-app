import { IAccommodationsRepository } from '../../domain/accomodations.repository.interface';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { MikroOrmAccommodationEntity } from './mikro-orm.accommodation.entity';
import { Accommodation } from '../../domain/accomodation';

export class MikroOrmAccommodationsRepository implements IAccommodationsRepository {

  constructor(
    @InjectRepository(MikroOrmAccommodationEntity)
    private readonly repo: EntityRepository<MikroOrmAccommodationEntity>,
  ) {}

  create(accommodation: Accommodation): Promise<Accommodation> {
    return Promise.resolve(undefined);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Accommodation[]> {
    return Promise.resolve([]);
  }

  findById(id: string): Promise<Accommodation> {
    return Promise.resolve(undefined);
  }

  update(accommodation: Accommodation): Promise<Accommodation> {
    return Promise.resolve(undefined);
  }

}
