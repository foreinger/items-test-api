import { Column, Entity, ManyToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Room } from './room.entity';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {

  @Column({ unique: true })
  public username: string;

  @ManyToMany(() => Room, (room) => room.members)
  rooms: Room[];

  @Column()
  @Exclude({ toPlainOnly: true })
  private password: string;

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
