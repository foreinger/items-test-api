import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RoomEntity } from './room.entity';
import { ID } from '../core/types/alias.types';

@Entity({ name: 'messages' })
export class MessageEntity extends BaseEntity {
  @Column()
  public text: string;

  @Column()
  public senderId: ID;

  @ManyToOne(() => RoomEntity, (room) => room.messages)
  public room: RoomEntity;
}
