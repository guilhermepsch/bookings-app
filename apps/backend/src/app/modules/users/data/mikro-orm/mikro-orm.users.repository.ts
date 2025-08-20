import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../../domain/user';
import { MikroOrmUsersMapper } from './mikro-orm.users.mapper';
import { MikroOrmUserEntity } from './mikro-orm.user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { IUsersRepository } from '../../domain/users.repository.interface';


export class MikroOrmUsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(MikroOrmUserEntity)
    private readonly repo: EntityRepository<MikroOrmUserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const orm = await this.repo.findOne({ id });
    return orm ? MikroOrmUsersMapper.toDomain(orm) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const orm = await this.repo.findOne({ email });
    return orm ? MikroOrmUsersMapper.toDomain(orm) : null;
  }

  async save(user: User): Promise<User> {
    const entity = MikroOrmUsersMapper.toEntity(user);
    await this.repo.insert(entity);
    return user;
  }

}
