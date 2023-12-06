import { Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { Message } from './message.entity';

@Entity()
export class Room extends BaseEntity {

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable()
  public members: User[];

  @OneToMany(() => Message, (msg) => msg.room)
  messages: Message[];

  @OneToOne(() => Message, { nullable: true })
  @JoinColumn()
  lastMessage: Message | null;
}
