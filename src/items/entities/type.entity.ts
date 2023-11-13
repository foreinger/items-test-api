import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { BaseEntity } from '../../core/entities/base.entity';

@Entity({ name: 'types' })
export class Type extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @OneToMany(() => Item, (item) => item.type)
  public items: Item[];
}
