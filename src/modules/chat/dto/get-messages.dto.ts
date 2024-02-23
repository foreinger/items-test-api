import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ID } from '../../../core/types/alias.types';

export class GetMessagesDto {
  @ApiProperty()
  @IsNotEmpty()
  public roomId: ID;
}
