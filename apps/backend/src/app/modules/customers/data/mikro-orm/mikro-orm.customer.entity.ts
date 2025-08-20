import { Entity, PrimaryKey, Property, OneToMany, OneToOne, Collection } from '@mikro-orm/core';
import { MikroOrmReservationEntity } from '../../../reservations/data/mikro-orm/mikro-orm.reservation.entity';
import { MikroOrmUserEntity } from '../../../users/data/mikro-orm/mikro-orm.user.entity';

@Entity({ tableName: 'customers' })
export class MikroOrmCustomerEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property()
  phone!: string;

  @Property()
  cpf!: string;

  @OneToMany(() => MikroOrmReservationEntity, r => r.client)
  reservations = new Collection<MikroOrmReservationEntity>(this);

  @OneToOne(() => MikroOrmUserEntity, u => u.customer, { nullable: false, owner: true })
  user!: MikroOrmUserEntity;
}
