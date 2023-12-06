import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../entities/message.entity';
import { Room } from '../../entities/room.entity';
import { ChatService } from './chat.service';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message, User])],
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway],
  controllers: [ChatController]
})
export class ChatModule {
}
