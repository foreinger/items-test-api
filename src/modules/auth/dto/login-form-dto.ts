import { IsLowercase, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginFormDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  public username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
