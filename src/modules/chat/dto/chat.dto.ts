import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNumber()
  roomId: number;
}

export class JoinRoomDto {
  @ApiProperty()
  @IsNumber()
  roomId: number;
}

export class GetRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  memberId: number;
}

export class GetMessagesDto {
  @ApiProperty()
  @IsNotEmpty()
  roomId: number;
}
