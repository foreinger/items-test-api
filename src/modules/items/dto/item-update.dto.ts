import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ID } from '../../../core/types/alias.types';
import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UpdateItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public id: ID;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  public name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  public type?: string;
}
