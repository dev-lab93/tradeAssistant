/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserRole } from './users/user-role.enum';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server is running on http://0.0.0.0:${port}`);

  // ✅ Автоматско креирање admin при прв старт
  const authService = app.get(AuthService);

  await authService.register(
    'Marija Admin',
    'marija.admin@example.com',
    'supersecret',
    '070123457',
    UserRole.ADMIN
  ).catch(() => {
    // Ако веќе постои, не прави ништо
    console.log('Admin already exists');
  });
}
bootstrap();
