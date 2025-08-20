import { Customer } from '../../domain/customer';
import { MikroOrmCustomerEntity } from './mikro-orm.customer.entity';

export class CustomerMapper {
  static toDomain(entity: MikroOrmCustomerEntity): Customer {
    return new Customer(
      entity.id,
      entity.fullName,
      entity.email,
      entity.phone,
      entity.cpf,
      entity.reservations.getItems().map(r => r.id),
      entity.user.id,
      entity.createdAt,
      entity.updatedAt
    );
  }
}
