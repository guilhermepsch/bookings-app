import { User } from '../../domain/user';
import { MikroOrmUserEntity } from './mikro-orm.user.entity';

export class MikroOrkmUsersMapper {
  static toDomain(entity: MikroOrmUserEntity): User {
    return new User(entity.id, entity.name, entity.email, entity.secret, entity.role);
  }

  static toEntity(user: User): MikroOrmUserEntity {
    const entity = new MikroOrmUserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.email = user.email;
    entity.secret = user.secret;
    entity.role = user.role;
    return entity;
  }
}
