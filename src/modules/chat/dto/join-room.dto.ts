import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ID } from '../../../core/types/alias.types';

export class JoinRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public roomId: ID;
}
