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
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true, // автоматски ги вчитува сите entity класи
        synchronize: true, // ❗ за продукција постави на false
      }),
      inject: [ConfigService],
    }),

    // 📚 Модули на апликацијата
    UsersModule,
    AuthModule,
    ProductsModule,
    NewsModule,
  ],
})
export class AppModule {}
