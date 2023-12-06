import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Room } from './room.entity';

@Entity()
export class Message extends BaseEntity {

  @Column()
  text: string;

  @Column()
  senderId: number;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;
}
