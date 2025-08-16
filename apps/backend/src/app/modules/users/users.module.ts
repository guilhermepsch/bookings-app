import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '@users/data/mikro-orm/user.entity';
import { UsersService } from '@users/domain/users.service';
import {
  IUsersRepositoryToken,
} from '@users/domain/users.repository';
import { MikroOrmUsersRepository } from '@users/data/mikro-orm/users.repository';
import { UsersController } from '@users/presentation/users.controller';


@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [
    UsersService,
    { provide: IUsersRepositoryToken, useClass: MikroOrmUsersRepository },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
