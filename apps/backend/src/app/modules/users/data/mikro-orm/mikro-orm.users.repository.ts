import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../../domain/user';
import { MikroOrmUsersMapper } from './mikro-orm.users.mapper';
import { MikroOrmUserEntity } from './mikro-orm.user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { IUsersRepository } from '../../domain/users.repository.interface';
import { ReadUsersDto } from '@bookings-app/shared-types';

export class MikroOrmUsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(MikroOrmUserEntity)
    private readonly repo: EntityRepository<MikroOrmUserEntity>
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
    const entity = new MikroOrmUserEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.secret = user.secret;
    entity.fullName = user.fullName;
    entity.phone = user.phone;
    entity.cpf = user.cpf;
    entity.role = user.role;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    await this.repo.insert(entity);
    return user;
  }

  async find(query: ReadUsersDto): Promise<{ users: User[]; total: number }> {
    const filters: any = {};
    if (query.fullName) {
      filters.fullName = { $like: `%${query.fullName}%` };
    }

    if (query.phone) {
      filters.phone = { $like: `%${query.phone}%` };
    }

    if (query.cpf) {
      filters.cpf = { $like: `%${query.cpf}%` };
    }

    if (query.email) {
      filters.email = { $like: `%${query.email}%` };
    }

    if (query.role) {
      filters.role = query.role;
    }

    const page = query.page;
    const limit = query.pageSize;

    const users = await this.repo.find(filters, {
      limit,
      offset: (page - 1) * limit,
    });
    const total = await this.repo.count(filters);

    return { users: users.map(MikroOrmUsersMapper.toDomain), total };
  }

  async delete(id: string): Promise<void> {
    await this.repo.nativeDelete({ id });
  }
}
