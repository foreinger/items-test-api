import { TypeEntity } from '../../../entities/type.entity';
import { ItemEntity } from '../../../entities/item.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ItemDto } from './item.dto';

export class TypeDto extends TypeEntity {
  @ApiProperty()
  public name: string;

  @ApiProperty({ type: () => ItemDto })
  public items: ItemEntity[];
}
