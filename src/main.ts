import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import RMQConfig from './rmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.connectMicroservice(RMQConfig);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
