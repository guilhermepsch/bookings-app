import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ReservationStatus } from '@bookings-app/shared-types';
import { MikroOrmCustomerEntity } from '../../../customers/data/mikro-orm/mikro-orm.customer.entity';
import { MikroOrmAccommodationEntity } from '../../../accommodations/data/mikro-orm/mikro-orm.accommodation.entity';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'reservas' })
export class MikroOrmReservationEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @ManyToOne(() => MikroOrmCustomerEntity)
  customer!: MikroOrmCustomerEntity;

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
