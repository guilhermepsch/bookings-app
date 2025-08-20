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
    );
  }

  static toEntity(domain: Customer): MikroOrmCustomerEntity {
    const entity = new MikroOrmCustomerEntity();
    entity.id = domain.id;
    entity.fullName = domain.fullName;
    entity.email = domain.email;
    entity.phone = domain.phone;
    entity.cpf = domain.cpf;
    entity.user = { id: domain.userId } as any;
    return entity;
  }
}
