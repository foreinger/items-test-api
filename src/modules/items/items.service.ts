import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { TypeEntity } from '../../entities/type.entity';
import { ItemEntity } from '../../entities/item.entity';
import { ID } from '../../core/types/alias.types';
import { CreateItemDto } from './dto/item-create.dto';
import { UpdateItemDto } from './dto/item-update.dto';
import { TypeStatisticDto } from './dto/type-statistic.dto';
import { ResponseDto } from '../../core/dto/response.dto';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { PaginationParamsDto } from '../../core/dto/pagination-params.dto';
import { ItemDto } from './dto/item.dto';
import { TokenPayload } from '../auth/types/auth.types';
import { UserEntity } from '../../entities/user.entity';
import { allKeys } from '../../core/utils/all-keys';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemsRepository: Repository<ItemEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TypeEntity)
    private typesRepository: Repository<TypeEntity>,
  ) {}

  public async getItems(dto: PaginationParamsDto): Promise<PaginationDto<ItemEntity>> {
    const [data, total] = await this.itemsRepository.findAndCount({
      relations: { type: true, createdBy: true },
      select: allKeys(this.itemsRepository),
      order: { updated_at: 'DESC' },
      skip: dto.pageIndex * dto.pageSize,
      take: dto.pageSize,
    });

    return new PaginationDto<ItemEntity>({ data, total, ...dto });
  }

  public async createItem(dto: CreateItemDto, tokenPayload: TokenPayload): Promise<ResponseDto<ItemEntity>> {
    const createdBy = await this.userRepository.findOneBy({ id: tokenPayload.sub });

    const type: TypeEntity = (await this.typesRepository.findOneBy({ name: dto.type }).catch(() => null)) ?? (await this.typesRepository.save({ name: dto.type }));

    const item = await this.itemsRepository.save({ ...dto, type, createdBy });
    return new ResponseDto(item);
  }

  public async getTypesAutocomplete(input: string): Promise<ResponseDto<TypeEntity[]>> {
    const options = await this.typesRepository.find({
      where: { name: ILike(`%${input}%`) },
      take: 5,
    });

    return new ResponseDto<TypeEntity[]>(options);
  }

  public async updateItem(dto: UpdateItemDto): Promise<ResponseDto<ItemDto>> {
    const { id, name, type } = dto;
    const item = await this.itemsRepository.findOne({ where: { id }, relations: { type: true } }).catch(() => null);
    if (!item) {
      return Promise.reject('Item not found');
    }
    if (name) {
      item.name = name;
    }

    if (type) {
      // if new type already exist use it else create new one
      item.type = (await this.typesRepository.findOneBy({ name: type }).catch(() => null)) ?? (await this.typesRepository.save({ name: type }));
    }

    const result = await this.itemsRepository.save(item);

    return new ResponseDto(result);
  }

  public async deleteItem(id: ID): Promise<ResponseDto<ItemDto>> {
    const item = await this.itemsRepository.findOne({
      where: { id },
      relations: { type: true },
    });

    await this.itemsRepository.delete({ id: item.id });

    const typeItemsCount = await this.itemsRepository.count({
      where: { type: { id: item.type.id } },
    });

    if (typeItemsCount === 0) {
      await this.typesRepository.delete({ id: item.type.id });
    }

    return new ResponseDto(item);
  }

  public async getStatistic(dto: PaginationParamsDto): Promise<PaginationDto<TypeStatisticDto>> {
    const data = await this.typesRepository
      .createQueryBuilder('type')
      .leftJoin('type.items', 'item')
      .select(['type.id as id', 'type.name as name', 'COUNT(item) as items_count'])
      .groupBy('type.id')
      .orderBy({ items_count: 'DESC' })
      .offset(dto.pageIndex * dto.pageSize)
      .limit(dto.pageSize)
      .getRawMany()
      .then((data) => data.map((item) => new TypeStatisticDto(item)));

    const { total } = await this.typesRepository.createQueryBuilder('type').select('COUNT(type)', 'total').getRawOne();
    return new PaginationDto<TypeStatisticDto>({ data, total, ...dto });
  }
}
