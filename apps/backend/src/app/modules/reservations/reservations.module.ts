import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmReservationEntity } from './data/mikro-orm/mikro-orm.reservation.entity';
import { ReservationsService } from './domain/reservations.service';
import { ReservationsController } from './presentation/reservations.controller';
import { IReservationsRepositoryToken } from './domain/reservations.repository.interface';
import { MikroOrmReservationsRepository } from './data/mikro-orm/mikro-orm.reservations.repository';
import { UsersModule } from '../users/users.module';
import { AccommodationsModule } from '../accommodations/accommodations.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([MikroOrmReservationEntity]),
    UsersModule,
    AccommodationsModule,
  ],
  providers: [
    ReservationsService,
    {
      provide: IReservationsRepositoryToken,
      useClass: MikroOrmReservationsRepository,
    },
  ],
  controllers: [ReservationsController],
  exports: [ReservationsService],
})
export class ReservationsModule {}
