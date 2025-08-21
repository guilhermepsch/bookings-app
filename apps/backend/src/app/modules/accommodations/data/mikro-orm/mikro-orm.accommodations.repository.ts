import { IAccommodationsRepository } from '../../domain/accomodations.repository.interface';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { MikroOrmAccommodationEntity } from './mikro-orm.accommodation.entity';
import { Accommodation } from '../../domain/accomodation';
import { AccommodationMapper } from './mikro-orm.accommodations.mapper';
import { ReadAccommodationDto } from '@bookings-app/shared-types';
import { MikroOrmUserEntity } from '../../../users/data/mikro-orm/mikro-orm.user.entity';

export class MikroOrmAccommodationsRepository
  implements IAccommodationsRepository
{
  constructor(
    @InjectRepository(MikroOrmAccommodationEntity)
    private readonly repo: EntityRepository<MikroOrmAccommodationEntity>
  ) {}

  async create(accommodation: Accommodation): Promise<Accommodation> {
    const entity = new MikroOrmAccommodationEntity();
    entity.id = accommodation.id;
    entity.type = accommodation.type;
    entity.description = accommodation.description;
    entity.capacity = accommodation.capacity;
    entity.streetType = accommodation.streetType;
    entity.street = accommodation.street;
    entity.number = accommodation.number;
    entity.district = accommodation.district;
    entity.city = accommodation.city;
    entity.state = accommodation.state;
    entity.complement = accommodation.complement;
    entity.zipCode = accommodation.zipCode;
    entity.latitude = accommodation.latitude;
    entity.longitude = accommodation.longitude;
    entity.pricePerNight = accommodation.pricePerNight;
    entity.status = accommodation.status;
    entity.user = this.repo
      .getEntityManager()
      .getReference(MikroOrmUserEntity, accommodation.userId);
    entity.createdAt = accommodation.createdAt;
    entity.updatedAt = accommodation.updatedAt;
    await this.repo.insert(entity);
    return AccommodationMapper.toDomain(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repo.nativeDelete({ id });
  }

  async findAll(
    query: ReadAccommodationDto
  ): Promise<{ accommodations: Accommodation[]; total: number }> {
    const filters: any = {};

    if (query.type) {
      filters.type = query.type;
    }

    if (query.status) {
      filters.status = query.status;
    }

    if (query.city) {
      filters.city = { $like: `%${query.city}%` };
    }

    if (query.state) {
      filters.state = { $like: `%${query.state}%` };
    }

    if (query.district) {
      filters.district = { $like: `%${query.district}%` };
    }

    if (query.street) {
      filters.street = { $like: `%${query.street}%` };
    }

    if (query.number) {
      filters.number = { $like: `%${query.number}%` };
    }

    if (query.zipCode) {
      filters.zipCode = { $like: `%${query.zipCode}%` };
    }

    if (query.pricePerNight) {
      filters.pricePerNight = query.pricePerNight;
    }

    const page = query.page;
    const limit = query.pageSize;

    const accommodations = await this.repo.find(filters, {
      limit,
      offset: (page - 1) * limit,
    });
    const total = await this.repo.count(filters);
    return {
      accommodations: accommodations.map((accommodation) =>
        AccommodationMapper.toDomain(accommodation)
      ),
      total,
    };
  }

  async findById(id: string): Promise<Accommodation> {
    const accommodation = await this.repo.findOne({ id });
    return AccommodationMapper.toDomain(accommodation);
  }

  async update(accommodation: Accommodation): Promise<Accommodation> {
    const entity = await this.repo.findOne({ id: accommodation.id });
    entity.type = accommodation.type ? accommodation.type : entity.type;
    entity.description = accommodation.description
      ? accommodation.description
      : entity.description;
    entity.capacity = accommodation.capacity
      ? accommodation.capacity
      : entity.capacity;
    entity.streetType = accommodation.streetType
      ? accommodation.streetType
      : entity.streetType;
    entity.street = accommodation.street ? accommodation.street : entity.street;
    entity.number = accommodation.number ? accommodation.number : entity.number;
    entity.district = accommodation.district
      ? accommodation.district
      : entity.district;
    entity.city = accommodation.city ? accommodation.city : entity.city;
    entity.state = accommodation.state ? accommodation.state : entity.state;
    entity.complement = accommodation.complement
      ? accommodation.complement
      : entity.complement;
    entity.zipCode = accommodation.zipCode
      ? accommodation.zipCode
      : entity.zipCode;
    entity.latitude = accommodation.latitude
      ? accommodation.latitude
      : entity.latitude;
    entity.longitude = accommodation.longitude
      ? accommodation.longitude
      : entity.longitude;
    entity.pricePerNight = accommodation.pricePerNight
      ? accommodation.pricePerNight
      : entity.pricePerNight;
    entity.status = accommodation.status ? accommodation.status : entity.status;
    entity.updatedAt = accommodation.updatedAt
      ? accommodation.updatedAt
      : entity.updatedAt;
    await this.repo.getEntityManager().flush();
    return AccommodationMapper.toDomain(entity);
  }
}
