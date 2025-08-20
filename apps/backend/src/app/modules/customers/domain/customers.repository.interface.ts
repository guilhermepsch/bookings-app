import { Customer } from './customer';

export const ICustomersRepositoryToken = Symbol('ICustomersRepository');

export interface ICustomersRepository {
  create(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer>;
}
