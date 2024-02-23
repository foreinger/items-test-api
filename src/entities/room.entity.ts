import { Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';
import { MessageEntity } from './message.entity';

@Entity({ name: 'rooms' })
export class RoomEntity extends BaseEntity {
  @ManyToMany(() => UserEntity, (user) => user.rooms, {
    orphanedRowAction: 'nullify',
  })
  @JoinTable()
  public members: UserEntity[];

  @OneToMany(() => MessageEntity, (msg) => msg.room)
  public messages: MessageEntity[];

  @OneToOne(() => MessageEntity, { nullable: true })
  @JoinColumn()
  public lastMessage: MessageEntity | null;
}
