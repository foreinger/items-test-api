import { Column, Entity, ManyToOne } from 'typeorm';
import { TypeEntity } from './type.entity';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'items' })
export class ItemEntity extends BaseEntity {
  @Column()
  public name: string;

  @ManyToOne(() => TypeEntity, (type: TypeEntity) => type.items, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  public type: TypeEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.items, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  public createdBy: UserEntity;
}
