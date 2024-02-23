import { MessageEntity } from 'src/entities/message.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { RoomDto } from './room.dto';

export class MessageDto extends MessageEntity {
  @ApiProperty()
  public text: string;
  @ApiProperty()
  public senderId: string;
  @ApiProperty({ type: () => RoomDto })
  public room: RoomDto;
}
