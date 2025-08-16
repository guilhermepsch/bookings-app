import { IUsersRepository, IUsersRepositoryToken } from './users.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Role, User } from './user';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@Inject(IUsersRepositoryToken) private readonly repository: IUsersRepository) {}

  async registerUser(name: string, email: string, secret: string): Promise<User> {
    const existing = await this.repository.findByEmail(email);
    if (existing) {
      throw new Error('User already exists with this email');
    }

    const user = new User(uuid(), name, email, secret, Role.USER);
    return await this.repository.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }
}
