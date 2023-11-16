import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
