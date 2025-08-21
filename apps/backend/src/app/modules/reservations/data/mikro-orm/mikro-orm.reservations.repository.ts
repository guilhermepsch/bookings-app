import { IReservationsRepository } from '../../domain/reservations.repository.interface';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { MikroOrmReservationEntity } from './mikro-orm.reservation.entity';
import { Reservation } from '../../domain/reservation';
import { MikroOrmUserEntity } from '../../../users/data/mikro-orm/mikro-orm.user.entity';
import { MikroOrmAccommodationEntity } from '../../../accommodations/data/mikro-orm/mikro-orm.accommodation.entity';
import { ReservationMapper } from './mikro-orm.reservations.mapper';
import { ReadReservationsDto } from '@bookings-app/shared-types';

export class MikroOrmReservationsRepository implements IReservationsRepository {
  constructor(
    @InjectRepository(MikroOrmReservationEntity)
    private readonly repo: EntityRepository<MikroOrmReservationEntity>
  ) {}

  async save(dto: Reservation): Promise<Reservation> {
    const entity = new MikroOrmReservationEntity();
    entity.id = dto.id;
    entity.user = this.repo
      .getEntityManager()
      .getReference(MikroOrmUserEntity, dto.userId);
    entity.accommodation = this.repo
      .getEntityManager()
      .getReference(MikroOrmAccommodationEntity, dto.accommodationId);
    entity.checkIn = dto.checkIn;
    entity.checkOut = dto.checkOut;
    entity.totalPrice = dto.totalPrice;
    entity.status = dto.status;
    entity.createdAt = dto.createdAt;
    entity.updatedAt = dto.updatedAt;
    await this.repo.insert(entity);
    return ReservationMapper.toDomain(entity);
  }

  async find(
    dto: ReadReservationsDto
  ): Promise<{ reservations: Reservation[]; total: number }> {
    const filter: any = {};

    if (dto.customer) {
      filter.customer = dto.customer;
    }

    if (dto.accommodation) {
      filter.accommodation = dto.accommodation;
    }

    if (dto.status) {
      filter.status = dto.status;
    }

    if (dto.checkIn && dto.checkOut) {
      filter.$and = [
        { checkIn: { $lt: dto.checkOut } },
        { checkOut: { $gt: dto.checkIn } },
      ];
    }

    const [reservations, total] = await this.repo.findAndCount(filter);
    return {
      reservations: reservations.map(ReservationMapper.toDomain),
      total,
    };
  }

  async findById(id: string): Promise<Reservation | null> {
    const entity = await this.repo.findOne({ id });
    return entity ? ReservationMapper.toDomain(entity) : null;
  }

  async update(dto: Reservation): Promise<Reservation> {
    const entity = await this.repo.findOne({ id: dto.id });
    entity.status = dto.status;
    await this.repo.getEntityManager().flush();
    return ReservationMapper.toDomain(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repo.nativeDelete({ id });
  }
}
