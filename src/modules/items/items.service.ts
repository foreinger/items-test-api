import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../entities/item.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateItemDto, TypeDto, UpdateItemDto } from './dto/item.dto';
import { PaginationParamsDto } from '../../core/dto/pagination.dto';
import { Pagination, PaginationParams } from '../../core/models/pagination.models';
import { Type } from '../../entities/type.entity';
import { TypeStatistic } from '../../entities/type-view.entity';

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

  public async getItems(dto: PaginationParamsDto): Promise<Pagination<Item>> {
    const paginationParams = new PaginationParams(dto);

    const [data, total] = await this.itemsRepository.findAndCount({
      relations: { type: true },
      order: { id: 'ASC' },
      skip: paginationParams.pageIndex * paginationParams.pageSize,
      take: paginationParams.pageSize
    });

    return new Pagination<Item>({ data, total, ...paginationParams });
  }

  public async createItem(dto: CreateItemDto): Promise<Item> {
    const type: Type = await this.typesRepository.findOneBy({ name: dto.type }).catch(() => null)
      ?? await this.typesRepository.save({ name: dto.type });

    return this.itemsRepository.save({ ...dto, type });
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

  public async deleteItem(id: number): Promise<Item> {
    const item: Item = await this.itemsRepository.findOne({ where: { id } }).catch(() => null);
    return this.itemsRepository.remove(item);
  }

  public async getStatistic(dto: PaginationParamsDto): Promise<Pagination<TypeStatistic>> {
    const paginationParams = new PaginationParams(dto);

    const [data, total] = await this.typesStatisticRepository.findAndCount({
      skip: paginationParams.pageIndex * paginationParams.pageSize,
      take: paginationParams.pageSize
    });

    return new Pagination<TypeStatistic>({ data, total, ...paginationParams });
  }

  public async generateMockItems(quantity: number): Promise<Item[] | any> {
    // prepare types dto
    const typesDto = this.newArrayOf(quantity).map((v) => ({ name: `type ${v % 3}` }));
    // save types ignoring duplicates and fetch all types
    const types = await this.saveTypesBulk(typesDto);

    // compile items with certain type instance and save them
    const items: DeepPartial<Item[]> = this.newArrayOf(quantity).map((val) => {
      const type = types.find(({ name }) => name === `type ${val % 3}`);
      return { name: `test ${val}`, type };
    });

    return await this.itemsRepository.save(items);
  }

  private async saveTypesBulk(typesDto: TypeDto[]): Promise<Type[]> {
    // execute bulk save ignore duplicates
    await this.typesRepository
      .createQueryBuilder()
      .insert()
      .values(typesDto)
      .orIgnore()
      .execute();

    // return all types after bulk save
    return this.typesRepository.find();
  }

  private newArrayOf(length: number): number[] {
    return Array.from({ length }, (_, index) => index + 1);
  }
}
