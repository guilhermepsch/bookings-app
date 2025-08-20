import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { UserRoles } from '@bookings-app/shared-types';
import { MikroOrmCustomerEntity } from '../../../customers/data/mikro-orm/mikro-orm.customer.entity';
import { MikroOrmAccommodationEntity } from '../../../accommodations/data/mikro-orm/mikro-orm.accommodation.entity';

@Entity({ tableName: 'users' })
export class MikroOrmUserEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @Property({ unique: true })
  email!: string;

  @Property()
  secret!: string;

  @Property({ type: 'string' })
  role: UserRoles = UserRoles.USER;

  @OneToOne(() => MikroOrmCustomerEntity, c => c.user, { nullable: true })
  customer?: MikroOrmCustomerEntity;

  @OneToMany(() => MikroOrmAccommodationEntity, c => c.user, { nullable: true, eager: true })
  accommodations = new Collection<MikroOrmAccommodationEntity>(this);

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updatedAt!: Date;
}
