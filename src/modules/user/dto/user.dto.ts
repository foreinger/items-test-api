import { UserEntity } from '../../../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RoomDto } from '../../chat/dto/room.dto';

export class UserDto extends UserEntity {
  @ApiProperty()
  public username: string;

  @ApiProperty({ type: () => [RoomDto], required: false })
  public rooms: RoomDto[];
}
