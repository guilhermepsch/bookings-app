import { Accommodation } from '../../domain/accomodation';
import { MikroOrmAccommodationEntity } from './mikro-orm.accommodation.entity';

export class AccommodationMapper {
  static toDomain(entity: MikroOrmAccommodationEntity): Accommodation {
    return new Accommodation(
      entity.id,
      entity.type,
      entity.description,
      entity.capacity,
      entity.streetType,
      entity.street,
      entity.number,
      entity.district,
      entity.city,
      entity.state,
      entity.complement,
      entity.zipCode,
      entity.latitude,
      entity.longitude,
      entity.pricePerNight,
      entity.status,
      entity.reservations.getItems().map(r => r.id),
    );
  }

  static toEntity(domain: Accommodation): MikroOrmAccommodationEntity {
    const entity = new MikroOrmAccommodationEntity();
    entity.id = domain.id;
    entity.type = domain.type;
    entity.description = domain.description;
    entity.capacity = domain.capacity;
    entity.streetType = domain.streetType;
    entity.street = domain.street;
    entity.number = domain.number;
    entity.district = domain.district;
    entity.city = domain.city;
    entity.state = domain.state;
    entity.complement = domain.complement;
    entity.zipCode = domain.zipCode;
    entity.latitude = domain.latitude;
    entity.longitude = domain.longitude;
    entity.pricePerNight = domain.pricePerNight;
    entity.status = domain.status;
    return entity;
  }
}
