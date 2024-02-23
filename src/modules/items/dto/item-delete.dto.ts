import { ID } from '../../../core/types/alias.types';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class ItemDeleteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public id: ID;
}
