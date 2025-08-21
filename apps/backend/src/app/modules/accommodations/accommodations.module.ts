import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmAccommodationEntity } from './data/mikro-orm/mikro-orm.accommodation.entity';
import { AccommodationsService } from './domain/accomodations.service';
import { IAccommodationsRepositoryToken } from './domain/accomodations.repository.interface';
import { MikroOrmAccommodationsRepository } from './data/mikro-orm/mikro-orm.accommodations.repository';
import { AccommodationsController } from './presentation/accomodations.controller';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [MikroOrmModule.forFeature([MikroOrmAccommodationEntity]), UsersModule],
  providers: [
    AccommodationsService,
    { provide: IAccommodationsRepositoryToken, useClass: MikroOrmAccommodationsRepository },
  ],
  controllers: [AccommodationsController],
  exports: [AccommodationsService],
})
export class AccommodationsModule {}
