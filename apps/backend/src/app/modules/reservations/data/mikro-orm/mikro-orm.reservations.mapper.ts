import { Reservation } from '../../domain/reservation';
import { MikroOrmReservationEntity } from './mikro-orm.reservation.entity';

export class ReservationMapper {
  static toDomain(entity: MikroOrmReservationEntity): Reservation {
    return new Reservation(
      entity.id,
      entity.client.id,
      entity.accommodation.id,
      entity.checkIn,
      entity.checkOut,
      entity.totalPrice,
      entity.status,
    );
  }

  static toEntity(domain: Reservation): MikroOrmReservationEntity {
    const entity = new MikroOrmReservationEntity();
    entity.id = domain.id;
    entity.checkIn = domain.checkIn;
    entity.checkOut = domain.checkOut;
    entity.totalPrice = domain.totalPrice;
    entity.status = domain.status;
    entity.client = { id: domain.clientId } as any;
    entity.accommodation = { id: domain.accommodationId } as any;
    return entity;
  }
}
