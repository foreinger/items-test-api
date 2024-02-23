import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { RoomEntity } from '../../entities/room.entity';
import { MessageEntity } from '../../entities/message.entity';
import { ID } from '../../core/types/alias.types';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ResponseDto } from '../../core/dto/response.dto';
import { RoomDto } from './dto/room.dto';
import { MessageDto } from './dto/message.dto';
import { allKeys } from '../../core/utils/all-keys';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async getRooms(userId: ID): Promise<ResponseDto<RoomDto[]>> {
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .addSelect(['room.created_at'])
      .innerJoin('room.members', 'user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('room.members', 'members')
      .leftJoinAndSelect('room.lastMessage', 'lastMessage')
      .addSelect(['lastMessage.created_at', 'lastMessage.updated_at'])
      .orderBy('room.updated_at', 'DESC')
      .getMany();

    return new ResponseDto(rooms);
  }

  public async getRoom(initiatorId: ID, memberId: ID): Promise<ResponseDto<RoomEntity>> {
    let room: RoomEntity = await this.roomRepository
      .createQueryBuilder('room')
      .innerJoin('room.members', 'initiator', 'initiator.id = :initiatorId', {
        initiatorId,
      })
      .innerJoin('room.members', 'member', 'member.id = :memberId', {
        memberId,
      })
      .where('initiator.id = :initiatorId AND member.id = :memberId')
      .setParameter('initiatorId', initiatorId)
      .setParameter('memberId', memberId)
      .getOne();

    if (room) {
      return new ResponseDto<RoomEntity>(room);
    }

    const initiator: UserEntity = await this.userRepository.findOneBy({ id: initiatorId });
    const member: UserEntity = await this.userRepository.findOneBy({ id: memberId });
    room = await this.roomRepository.save({ members: [initiator, member] });
    return new ResponseDto<RoomDto>(room);
  }

  public async getMessages(roomId: ID): Promise<ResponseDto<MessageDto[]>> {
    const select: (keyof MessageEntity)[] = allKeys<MessageEntity>(this.messageRepository);
    const messages = await this.messageRepository.find({ where: { room: { id: roomId } }, select, order: { created_at: 'ASC' } });
    return new ResponseDto(messages);
  }

  public saveMessage({ text, roomId }: ChatMessageDto, senderId: ID): Promise<MessageEntity> {
    const message = { text, senderId, room: { id: roomId } };
    return this.messageRepository.save(message);
  }

  public async updateRoom(message: MessageEntity): Promise<RoomEntity> {
    const findOptions = { where: { id: message.room.id }, relations: { members: true } };
    const room = await this.roomRepository.findOne(findOptions);
    return this.roomRepository.save({ ...room, lastMessage: message });
  }
}
