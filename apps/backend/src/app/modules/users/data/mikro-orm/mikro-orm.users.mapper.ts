import { User } from '../../domain/user';
import { MikroOrmUserEntity } from './mikro-orm.user.entity';

export class MikroOrmUsersMapper {
  static toDomain(entity: MikroOrmUserEntity): User {
    return new User(
      entity.id,
      entity.email,
      entity.secret,
      entity.role,
      entity.customer?.id, // optional
    );
  }

  static toEntity(domain: User): MikroOrmUserEntity {
    const entity = new MikroOrmUserEntity();
    entity.id = domain.id;
    entity.email = domain.email;
    entity.secret = domain.secret;
    entity.role = domain.role;
    if (domain.customerId) {
      entity.customer = { id: domain.customerId } as any;
    }
    return entity;
  }
}
