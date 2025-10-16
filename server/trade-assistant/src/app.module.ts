import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// 🧩 Модули
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    // 📦 .env конфигурација
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🗄️ TypeORM конфигурација (PostgreSQL)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: 5432,
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ❗ на production стај false
        ssl:
          config.get<string>('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),

    // 📚 Модули на апликацијата
    UsersModule,
    AuthModule,
    ProductsModule,
    NewsModule,
  ],
})
export class AppModule {}
