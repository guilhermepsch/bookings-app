import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmUserEntity } from '@users/data/mikro-orm/mikro-orm.user.entity';
import { UsersService } from '@users/domain/users.service';
import {
  IUsersRepositoryToken,
} from '@users/domain/users.repository.interface';
import { MikroOrmUsersRepository } from '@users/data/mikro-orm/mikro-orm.users.repository';
import { UsersController } from '@users/presentation/users.controller';
import { HashModule } from '@common/resources/hash/hash.module';


@Module({
  imports: [MikroOrmModule.forFeature([MikroOrmUserEntity]), HashModule],
  providers: [
    UsersService,
    { provide: IUsersRepositoryToken, useClass: MikroOrmUsersRepository },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
