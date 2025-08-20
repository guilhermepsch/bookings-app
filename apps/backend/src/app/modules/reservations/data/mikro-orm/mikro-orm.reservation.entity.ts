import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ReservationStatus } from '@bookings-app/shared-types';
import { MikroOrmCustomerEntity } from '../../../customers/data/mikro-orm/mikro-orm.customer.entity';
import { MikroOrmAccommodationEntity } from '../../../accommodations/data/mikro-orm/mikro-orm.accommodation.entity';

@Entity({ tableName: 'reservas' })
export class MikroOrmReservationEntity {
  @PrimaryKey()
  id!: string;

  @ManyToOne(() => MikroOrmCustomerEntity)
  client!: MikroOrmCustomerEntity;

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
}
