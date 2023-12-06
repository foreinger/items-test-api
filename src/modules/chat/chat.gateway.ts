import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TokenService } from '../auth/services/token.service';
import { ChatEvents } from './enums/chat-events.enums';
import { ChatService } from './chat.service';
import { JoinRoomDto, MessageDto } from './dto/chat.dto';
import { SocketTokenData } from '../../core/decorators/token-data.decorator';
import { TokenPayload } from '../auth/types/auth.types';


@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/chat'
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  private server: Server;

  constructor(
    private tokenService: TokenService,
    private chatService: ChatService
  ) {
  }

  public async handleConnection(client: Socket): Promise<void> {
    await this.authenticateConnection(client);
  }

  public handleDisconnect(client: Socket) {
    console.log('disconnected');
  }

  @SubscribeMessage(ChatEvents.joinRoom)
  public async joinRoom(@MessageBody() { roomId }: JoinRoomDto, @ConnectedSocket() client: Socket) {
    await client.join(String(roomId));
    return client.emit(ChatEvents.roomJoined, { roomId });
  }

  @SubscribeMessage(ChatEvents.leaveRoom)
  public async leaveRoom(@MessageBody() { roomId }: JoinRoomDto, @ConnectedSocket() client: Socket) {
    await client.leave(String(roomId));
    return client.emit(ChatEvents.roomLeft, { roomId });
  }

  @SubscribeMessage(ChatEvents.sendMessage)
  public async handleMessage(@MessageBody() msg: MessageDto, @SocketTokenData() sender: TokenPayload): Promise<void> {
    const message = await this.chatService.saveMessage(msg, sender.sub);
    const room = await this.chatService.updateRoom(message);
    const [participant] = room.members.filter((user) => user.id !== sender.sub);


    this.server.to(String(sender.sub)).emit(ChatEvents.roomUpdated, room);
    this.server.to(String(participant.id)).emit(ChatEvents.roomUpdated, room);
    this.server.to(String(msg.roomId)).emit(ChatEvents.messageSent, message);
  }

  private async authenticateConnection(client: Socket): Promise<void> {
    try {
      const token = this.tokenService.extractToken(client.handshake.auth.token);
      const user = await this.tokenService.verifyToken(token);
      client.conn['user'] = user;
      client.join(String(user.sub));
    } catch (er) {
      client.emit('exception', er.response);
      client.disconnect(false);
    }
  }
}
