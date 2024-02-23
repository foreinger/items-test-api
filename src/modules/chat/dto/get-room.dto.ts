import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ID } from '../../../core/types/alias.types';

export class GetRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public memberId: ID;
}
