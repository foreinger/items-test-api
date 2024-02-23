import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ID } from '../../../core/types/alias.types';

export class ChatMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public roomId: ID;
}
