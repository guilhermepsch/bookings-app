import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HashModule } from '@common/resources/hash/hash.module';
import { AuthController } from '@modules/auth/presentation/auth.controller';
import { AuthService } from '@modules/auth/domain/auth.service';
import { ConfigServiceConstants } from '@config/config-service.constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@common/guards/auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>(ConfigServiceConstants.JWT_SECRET),
          signOptions: { expiresIn: '8h' },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
    UsersModule,
    HashModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
