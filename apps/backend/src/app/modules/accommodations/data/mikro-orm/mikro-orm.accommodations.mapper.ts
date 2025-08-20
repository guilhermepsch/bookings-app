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
      entity.user.id,
      entity.reservations.getItems().map(r => r.id),
      entity.createdAt,
      entity.updatedAt
    );
  }

}
