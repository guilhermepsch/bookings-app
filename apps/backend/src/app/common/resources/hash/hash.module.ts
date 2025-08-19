import { BcryptHashService } from '@common/resources/hash/data/bcrypt/bcrypt.hash.service';
import { IHashServiceSymbol } from './domain/hash.service.interface';
import { Module } from '@nestjs/common';

@Module({
  providers: [{
    provide: IHashServiceSymbol,
    useClass: BcryptHashService
  }],
  exports: [IHashServiceSymbol],
})
export class HashModule {}
