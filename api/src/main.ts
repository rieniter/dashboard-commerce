import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ORIGIN_URL ?? 'localhost:4000',
    credentials: true,
    allowHeaders: ['Accept', 'Content-Type', 'Authorization', 'X-Requested-With'],
    method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION']
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
