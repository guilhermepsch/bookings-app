import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection } from '@mikro-orm/core';
import { MikroOrmReservationEntity } from '../../../reservations/data/mikro-orm/mikro-orm.reservation.entity';
import { MikroOrmUserEntity } from '../../../users/data/mikro-orm/mikro-orm.user.entity';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'customers' })
export class MikroOrmCustomerEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property()
  phone!: string;

  @Property()
  cpf!: string;

  @OneToMany(() => MikroOrmReservationEntity, r => r.customer)
  reservations = new Collection<MikroOrmReservationEntity>(this);

  @OneToOne(() => MikroOrmUserEntity, u => u.customer, { nullable: false, owner: true })
  user!: MikroOrmUserEntity;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updatedAt!: Date;
}
