import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TokenService } from '../auth/services/token.service';
import { ChatEvents } from './enums/chat-events.enums';
import { ChatService } from './chat.service';
import { SocketTokenData } from '../../core/decorators/token-data.decorator';
import { TokenPayload } from '../auth/types/auth.types';
import { ChatMessageDto } from './dto/chat-message.dto';
import { JoinRoomDto } from './dto/join-room.dto';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(
    private tokenService: TokenService,
    private chatService: ChatService,
  ) {}

  public async handleConnection(client: Socket): Promise<void> {
    await this.authenticateConnection(client);
  }

  public handleDisconnect(): void {
    console.log('disconnected');
  }

  @SubscribeMessage(ChatEvents.joinRoom)
  public async joinRoom(@MessageBody() { roomId }: JoinRoomDto, @ConnectedSocket() client: Socket): Promise<boolean> {
    await client.join(String(roomId));
    return client.emit(ChatEvents.roomJoined, { roomId });
  }

  @SubscribeMessage(ChatEvents.leaveRoom)
  public async leaveRoom(@MessageBody() { roomId }: JoinRoomDto, @ConnectedSocket() client: Socket): Promise<boolean> {
    await client.leave(String(roomId));
    return client.emit(ChatEvents.roomLeft, { roomId });
  }

  @SubscribeMessage(ChatEvents.sendMessage)
  public async handleMessage(@MessageBody() msg: ChatMessageDto, @SocketTokenData() sender: TokenPayload): Promise<void> {
    const message = await this.chatService.saveMessage(msg, sender.sub);
    const room = await this.chatService.updateRoom(message);
    const [participant] = room.members.filter((user) => user.id !== sender.sub);
    this.server.to(sender.sub).emit(ChatEvents.roomUpdated, room);
    this.server.to(participant.id).emit(ChatEvents.roomUpdated, room);
    this.server.to(msg.roomId).emit(ChatEvents.messageSent, message);
  }

  private async authenticateConnection(client: Socket): Promise<void> {
    try {
      const bearer = client.handshake.auth.token;
      const token = this.tokenService.extractToken(bearer);
      const tokenPayload = await this.tokenService.verifyToken(token);
      client.conn['tokenPayload'] = tokenPayload;
      client.join(String(tokenPayload.sub));
    } catch (er) {
      client.emit('exception', er.response);
      client.disconnect(false);
    }
  }
}
