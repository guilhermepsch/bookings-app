import { User } from '../../domain/user';
import { MikroOrmUserEntity } from './mikro-orm.user.entity';

export class MikroOrmUsersMapper {
  static toDomain(entity: MikroOrmUserEntity): User {
    return new User(
      entity.id,
      entity.email,
      entity.secret,
      entity.role,
      entity.createdAt,
      entity.updatedAt,
      entity.customer?.id,
      entity.accommodations.map((a) => a.id)
    );
  }
}
