import { Column, Entity, ManyToOne } from 'typeorm';
import { Type } from './type.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToOne(
    () => Type, (type) => type.items,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true }
  )
  type: Type;
}
