import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoomEntity } from './room.entity';
import { BaseEntity } from './base.entity';
import { ItemEntity } from './item.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  public username: string;

  @ManyToMany(() => RoomEntity, (room) => room.members, { cascade: true, onDelete: 'CASCADE' })
  public rooms: RoomEntity[];

  @Column({ select: false })
  public password: string;

  @OneToMany(() => ItemEntity, (item: ItemEntity) => item.createdBy, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  public items: ItemEntity[];

  public async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
