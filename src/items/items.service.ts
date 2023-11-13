import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { PaginationParamsDto } from '../core/dto/pagination.dto';
import { Pagination, PaginationParams } from '../core/models/pagination.models';
import { Type } from './entities/type.entity';
import { TypeStatistic } from './entities/type.view-entity';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(Type)
    private typesRepository: Repository<Type>,
    @InjectRepository(TypeStatistic)
    private typesStatisticRepository: Repository<TypeStatistic>
  ) {
  }


  public async getItems(dto: PaginationParamsDto): Promise<Pagination<Item[]>> {
    const paginationParams = new PaginationParams(dto);

    const [data, total] = await this.itemsRepository.findAndCount({
      relations: { type: true },
      order: { id: 'ASC' },
      skip: paginationParams.pageIndex * paginationParams.pageSize,
      take: paginationParams.pageSize
    });

    return new Pagination<Item[]>({ data, total, ...paginationParams });
  }

  public async createItem(dto: CreateItemDto): Promise<Item> {
    console.log(dto);

    const type: Type = await this.typesRepository.findOneBy({ name: dto.type }).catch(() => null)
      ?? await this.typesRepository.save({ name: dto.type });

    const item = this.itemsRepository.create({ ...dto, type });

    return this.itemsRepository.save(item);
  }

  public async updateItem({ id, name, type }: UpdateItemDto): Promise<Item> {
    const item = await this.itemsRepository.findOne({ where: { id }, relations: { type: true } }).catch(() => null);
    if (!item) {
      return Promise.reject('Item not found');
    }
    if (name) {
      item.name = name;
    }

    if (type) {
      // if new type already exist use it else create new one
      item.type = await this.typesRepository.findOneBy({ name: type }).catch(() => null)
        ?? await this.typesRepository.save({ name: type });
    }
    return this.itemsRepository.save(item);
  }


  public async deleteItem(id: number): Promise<Item[]> {
    const item = await this.itemsRepository.findOne({ where: { id } }).catch(() => null);

    return this.itemsRepository.remove(item);
  }

  public async getStatistic(dto: PaginationParamsDto): Promise<Pagination<TypeStatistic[]>> {
    const paginationParams = new PaginationParams(dto);

    const [data, total] = await this.typesStatisticRepository.findAndCount({
      skip: paginationParams.pageIndex * paginationParams.pageSize,
      take: paginationParams.pageSize
    });

    return new Pagination<TypeStatistic[]>({ data, total, ...paginationParams });
  }

  public async createItems(length: number): Promise<Item[]> {
    const items = [];

    for (let i = 0; i <= length; i++) {
      const name = `test ${i}`;
      const type = `type ${i % 3}`;
      const item = await this.createItem({ name, type });
      items.push(item);
    }

    return items;
  }
}
