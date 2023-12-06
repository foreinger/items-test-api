import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { TokenPayload } from '../auth/types/auth.types';
import { HttpTokenData } from '../../core/decorators/token-data.decorator';
import { GetMessagesDto, GetRoomDto } from './dto/chat.dto';
import { Room } from '../../entities/room.entity';
import { Message } from '../../entities/message.entity';


@ApiBearerAuth()
@ApiTags('chat')
@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {

  constructor(
    private chatService: ChatService
  ) {
  }

  @Get(':memberId')
  public getRoom(@Param() param: GetRoomDto, @HttpTokenData() auth: TokenPayload): Promise<Room> {
    return this.chatService.getRoom(auth.sub, param.memberId);
  }

  @Get('')
  public getRooms(@HttpTokenData() auth: TokenPayload): Promise<Room[]> {
    return this.chatService.getRooms(auth.sub);
  }

  @Get('messages/:roomId')
  public getMessages(@Param() param: GetMessagesDto): Promise<Message[]> {
    return this.chatService.getMessages(param.roomId);
  }
}
