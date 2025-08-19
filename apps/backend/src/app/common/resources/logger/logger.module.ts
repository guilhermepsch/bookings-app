import { WinstonLoggerService } from '@common/resources/logger/data/winston/winston.logger.service';
import { ILoggerService } from '@common/resources/logger/domain/logger.service.interface';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: ILoggerService,
      useClass: WinstonLoggerService,
    },
  ],
  imports: [],
  exports: [ILoggerService]
})
export class LoggerModule {}
