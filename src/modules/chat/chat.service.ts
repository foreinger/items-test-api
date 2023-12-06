import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../../entities/room.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Message } from '../../entities/message.entity';
import { MessageDto } from './dto/chat.dto';

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  public getRooms(userId: number): Promise<Room[]> {
    return this.roomRepository
      .createQueryBuilder('room')
      .innerJoin('room.members', 'user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('room.members', 'members')
      .leftJoinAndSelect('room.lastMessage', 'lastMessage')
      .orderBy('room.updatedAt', 'DESC')
      .getMany();
  }

  public async getRoom(initiatorId: number, memberId: number): Promise<Room> {
    const room: Room = await this.roomRepository
      .createQueryBuilder('room')
      .innerJoin('room.members', 'initiator', 'initiator.id = :initiatorId', { initiatorId })
      .innerJoin('room.members', 'member', 'member.id = :memberId', { memberId })
      .where('initiator.id = :initiatorId AND member.id = :memberId')
      .setParameter('initiatorId', initiatorId)
      .setParameter('memberId', memberId)
      .getOne();

    if (room) {
      return room;
    }

    const initiator = await this.userRepository.findOneBy({ id: initiatorId });
    const member = await this.userRepository.findOneBy({ id: memberId });
    return this.roomRepository.save({ members: [initiator, member] });
  }

  public getMessages(roomId: number): Promise<Message[]> {
    return this.messageRepository.findBy({ room: { id: roomId } });
  }

  public saveMessage({ text, roomId }: MessageDto, senderId: number): Promise<Message> {
    const message = { text, senderId, room: { id: roomId } };
    return this.messageRepository.save(message);
  }

  public async updateRoom(message: Message): Promise<Room> {
    const findOptions = { where: { id: message.room.id }, relations: { members: true } };
    const room = await this.roomRepository.findOne(findOptions);
    return this.roomRepository.save({ ...room, lastMessage: message });
  }
}
