import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export class AuthResponseDto {
  @ApiProperty()
  public token: string;

  @ApiProperty({ type: () => UserDto })
  public me: UserDto;
}
