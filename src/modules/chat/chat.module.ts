import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { UserEntity } from '../../entities/user.entity';
import { RoomEntity } from '../../entities/room.entity';
import { MessageEntity } from '../../entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, MessageEntity, UserEntity])],
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
