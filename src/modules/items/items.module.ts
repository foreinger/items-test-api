import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from '../../entities/item.entity';
import { TypeEntity } from '../../entities/type.entity';
import { UserEntity } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity, TypeEntity, UserEntity])],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [TypeOrmModule],
})
export class ItemsModule {}
