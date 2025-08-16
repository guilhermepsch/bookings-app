import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ResponseMiddleware } from '@common/middlewares/response.middleware';
import { GlobalHttpExceptionFilter } from '@common/filters/http-exception.filter';
import { ZodExceptionFilter } from '@common/filters/zod-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new ResponseMiddleware().use);
  app.useGlobalFilters(new ZodExceptionFilter(), new GlobalHttpExceptionFilter());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
