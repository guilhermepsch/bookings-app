import {
  IUsersRepository,
  IUsersRepositoryToken,
} from './users.repository.interface';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './user';
import { v4 as uuid } from 'uuid';
import {
  CreateUserDto,
  ReadUsersDto,
  ResponseUserDto,
} from '@bookings-app/shared-types';
import {
  IHashService,
  IHashServiceSymbol,
} from '../../../common/resources/hash/domain/hash.service.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUsersRepositoryToken)
    private readonly repository: IUsersRepository,
    @Inject(IHashServiceSymbol) private readonly hashService: IHashService
  ) {}

  async create(dto: CreateUserDto): Promise<ResponseUserDto> {
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) {
      throw new UnprocessableEntityException(
        'User already exists with this email'
      );
    }
    const existingCpf = await this.repository.findByCpf(dto.cpf);
    if (existingCpf) {
      throw new UnprocessableEntityException(
        'User already exists with this cpf'
      );
    }

    const user = new User(
      uuid(),
      dto.email,
      await this.hashService.hash(dto.password),
      dto.fullName,
      dto.phone,
      dto.cpf,
      dto.role,
      new Date(),
      new Date()
    );
    const saved = await this.repository.save(user);
    return this.mapToResponseDto(saved);
  }

  async find(query: ReadUsersDto) {
    const { users, total } = await this.repository.find(query);
    return {
      data: users.map((user) => this.mapToResponseDto(user)),
      meta: {
        total,
        page: query.page,
        pageSize: query.pageSize,
      },
    };
  }

  async getUserById(id: string): Promise<ResponseUserDto> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.mapToResponseDto(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.repository.delete(id);
  }

  private mapToResponseDto(user: User): ResponseUserDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      cpf: user.cpf,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
