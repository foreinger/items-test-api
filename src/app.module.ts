import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/entities/item.entity';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { Type } from './items/entities/type.entity';
import { TypeStatistic } from './items/entities/type.view-entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [Item, Type, TypeStatistic],
      synchronize: true
    }),
    ItemsModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
