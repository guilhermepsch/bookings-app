import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ReservationStatus } from '@bookings-app/shared-types';
import { MikroOrmAccommodationEntity } from '../../../accommodations/data/mikro-orm/mikro-orm.accommodation.entity';
import { v4 as uuid } from 'uuid';
import { MikroOrmUserEntity } from '../../../users/data/mikro-orm/mikro-orm.user.entity';

@Entity({ tableName: 'reservas' })
export class MikroOrmReservationEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @ManyToOne(() => MikroOrmUserEntity)
  user!: MikroOrmUserEntity;

  @ManyToOne(() => MikroOrmAccommodationEntity)
  accommodation!: MikroOrmAccommodationEntity;

  @Property()
  checkIn!: Date;

  @Property()
  checkOut!: Date;

  @Property()
  totalPrice!: number;

  @Property()
  status!: ReservationStatus;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updatedAt!: Date;
}
