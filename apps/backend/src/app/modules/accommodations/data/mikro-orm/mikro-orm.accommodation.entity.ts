import { Entity, PrimaryKey, Property, OneToMany, Collection, ManyToOne } from '@mikro-orm/core';
import { AccomodationStatus } from '@bookings-app/shared-types';
import { MikroOrmReservationEntity } from '../../../reservations/data/mikro-orm/mikro-orm.reservation.entity';
import { MikroOrmUserEntity } from '../../../users/data/mikro-orm/mikro-orm.user.entity';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'accommodations' })
export class MikroOrmAccommodationEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @Property()
  type!: string;

  @Property()
  description!: string;

  @Property()
  capacity!: number;

  @Property()
  streetType!: string;

  @Property()
  street!: string;

  @Property()
  number!: string;

  @Property()
  district!: string;

  @Property()
  city!: string;

  @Property()
  state!: string;

  @Property()
  complement!: string;

  @Property()
  zipCode!: string;

  @Property()
  latitude!: number;

  @Property()
  longitude!: number;

  @Property()
  pricePerNight!: number;

  @Property()
  status!: AccomodationStatus;

  @OneToMany(() => MikroOrmReservationEntity, r => r.accommodation)
  reservations = new Collection<MikroOrmReservationEntity>(this);

  @ManyToOne(() => MikroOrmUserEntity)
  user!: MikroOrmUserEntity

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updatedAt!: Date;
}
