import { ID } from '../types/alias.types';
import { BaseEntity } from '../../entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto implements BaseEntity {
  @ApiProperty()
  public id: ID;

  @ApiProperty({ required: false })
  public created_at: string;

  @ApiProperty({ required: false })
  public updated_at: string;
}
