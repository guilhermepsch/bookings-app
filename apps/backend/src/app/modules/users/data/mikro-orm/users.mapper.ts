import { User } from '../../domain/user';
import { UserEntity } from './user.entity';

export class UsersMapper {
  static toDomain(entity: UserEntity): User {
    return new User(entity.id, entity.name, entity.email, entity.secret, entity.role);
  }

  static toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.email = user.email;
    entity.secret = user.secret;
    entity.role = user.role;
    return entity;
  }
}
