import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';
import { Type } from './type.entity';

@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(
    () => Type, (type) => type.items,
    { onDelete: 'CASCADE' , onUpdate: 'CASCADE', cascade: true}
  )
  type: Type;
}
