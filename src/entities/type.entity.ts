import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ItemEntity } from './item.entity';

@Entity({ name: 'types' })
export class TypeEntity extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @OneToMany(() => ItemEntity, (item) => item.type, { cascade: true })
  @JoinColumn({ name: 'item_id' })
  public items: ItemEntity[];
}
