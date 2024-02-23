import { CamelToSnakeCaseKeys } from '../../../core/types/utils.types';
import { ApiProperty } from '@nestjs/swagger';

export class TypeStatisticDto {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: number;
  @ApiProperty()
  public itemsCount: number;

  constructor(data: CamelToSnakeCaseKeys<TypeStatisticDto>) {
    this.id = data.id;
    this.name = data.name;
    this.itemsCount = data.items_count;
  }
}
