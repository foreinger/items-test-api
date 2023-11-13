import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Type } from './entities/type.entity';
import { TypeStatistic } from './entities/type.view-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Type, TypeStatistic])],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [TypeOrmModule]
})
export class ItemsModule {
}
