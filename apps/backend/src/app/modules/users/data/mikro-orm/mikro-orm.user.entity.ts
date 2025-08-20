import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { Role } from '@bookings-app/shared-types';
import { MikroOrmCustomerEntity } from '../../../customers/data/mikro-orm/mikro-orm.customer.entity';

@Entity({ tableName: 'users' })
export class MikroOrmUserEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @Property({ unique: true })
  email!: string;

  @Property()
  secret!: string;

  @Property({ type: 'string' })
  role: Role = Role.USER;

  @OneToOne(() => MikroOrmCustomerEntity, c => c.user, { nullable: true })
  customer?: MikroOrmCustomerEntity;
}
