/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Angular app URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // ✅ Enable global validation & body parsing
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // removes unexpected fields
      transform: true,      // auto transforms payloads into DTO instances
      forbidNonWhitelisted: false, // optional
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
