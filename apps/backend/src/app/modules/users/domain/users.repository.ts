import { User } from './user';

export const IUsersRepositoryToken = Symbol('IUserRepository');
export interface IUsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
