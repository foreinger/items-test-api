import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenPayload } from '../auth/types/auth.types';
import { HttpTokenData } from '../../core/decorators/token-data.decorator';
import { GetMessagesDto } from './dto/get-messages.dto';
import { GetRoomDto } from './dto/get-room.dto';
import { ApiArrayResponse, ApiErrorResponse, ApiObjectResponse } from '../../core/decorators/swagger.decorator';
import { RoomDto } from './dto/room.dto';
import { ResponseDto } from '../../core/dto/response.dto';
import { MessageDto } from './dto/message.dto';
import { AuthHttpGuard } from '../auth/guards/auth-http-guard.service';

@ApiBearerAuth()
@ApiTags('chat')
@UseGuards(AuthHttpGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':memberId')
  @ApiObjectResponse(RoomDto)
  @ApiErrorResponse()
  public getRoom(@Param() param: GetRoomDto, @HttpTokenData() tokenPayload: TokenPayload): Promise<ResponseDto<RoomDto>> {
    return this.chatService.getRoom(tokenPayload.sub, param.memberId);
  }

  @Get()
  @ApiArrayResponse(RoomDto)
  @ApiErrorResponse()
  public getRooms(@HttpTokenData() tokenPayload: TokenPayload): Promise<ResponseDto<RoomDto[]>> {
    return this.chatService.getRooms(tokenPayload.sub);
  }

  @Get('messages/:roomId')
  @ApiArrayResponse(MessageDto)
  @ApiErrorResponse()
  public getMessages(@Param() param: GetMessagesDto): Promise<ResponseDto<MessageDto[]>> {
    return this.chatService.getMessages(param.roomId);
  }
}
