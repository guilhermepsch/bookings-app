import {
  IUsersRepository,
  IUsersRepositoryToken,
} from './users.repository.interface';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './user';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '@bookings-app/shared-types';
import { IHashService, IHashServiceSymbol } from '@common/resources/hash/domain/hash.service.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUsersRepositoryToken)
    private readonly repository: IUsersRepository,
    @Inject(IHashServiceSymbol) private readonly hashService: IHashService
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) {
      throw new UnprocessableEntityException(
        'User already exists with this email'
      );
    }

    const user = new User(
      uuid(),
      dto.name,
      dto.email,
      await this.hashService.hash(dto.password),
      dto.role
    );
    return await this.repository.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }
}
