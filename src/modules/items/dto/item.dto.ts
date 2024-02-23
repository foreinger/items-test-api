import { ItemEntity } from '../../../entities/item.entity';
import { TypeEntity } from '../../../entities/type.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { TypeDto } from './type.dto';

export class ItemDto extends ItemEntity {
  @ApiProperty()
  public name: string;

  @ApiProperty({ type: () => TypeDto })
  public type: TypeEntity;
}
