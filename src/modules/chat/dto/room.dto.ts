import { RoomEntity } from '../../../entities/room.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { MessageDto } from './message.dto';
import { UserDto } from '../../user/dto/user.dto';

export class RoomDto extends RoomEntity {
  @ApiProperty({ type: () => UserDto })
  public members: UserDto[];

  @ApiProperty({ type: () => [MessageDto] })
  public messages: MessageDto[];

  @ApiProperty({ type: () => MessageDto })
  public lastMessage: MessageDto;
}
