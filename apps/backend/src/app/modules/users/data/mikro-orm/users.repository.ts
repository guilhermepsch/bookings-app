import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../../domain/user';
import { UsersMapper } from './users.mapper';
import { UserEntity } from './user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { IUsersRepository } from '../../domain/users.repository';


export class MikroOrmUsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: EntityRepository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const orm = await this.repo.findOne({ id });
    return orm ? UsersMapper.toDomain(orm) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const orm = await this.repo.findOne({ email });
    return orm ? UsersMapper.toDomain(orm) : null;
  }

  async save(user: User): Promise<User> {
    const entity = UsersMapper.toEntity(user);
    await this.repo.insert(entity);
    return user;
  }

}
