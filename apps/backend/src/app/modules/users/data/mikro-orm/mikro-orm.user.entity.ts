import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { Role } from '@bookings-app/shared-types';

@Entity({ tableName: 'users' })
export class MikroOrmUserEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid();

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  secret!: string;

  @Property({ type: 'string' })
  role: Role = Role.USER;
}
