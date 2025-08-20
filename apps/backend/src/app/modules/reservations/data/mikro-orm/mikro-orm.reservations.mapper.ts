import { Reservation } from '../../domain/reservation';
import { MikroOrmReservationEntity } from './mikro-orm.reservation.entity';

export class ReservationMapper {
  static toDomain(entity: MikroOrmReservationEntity): Reservation {
    return new Reservation(
      entity.id,
      entity.customer.id,
      entity.accommodation.id,
      entity.checkIn,
      entity.checkOut,
      entity.totalPrice,
      entity.status,
      entity.createdAt,
      entity.updatedAt
    );
  }
}
