import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { Pagination } from '../core/models/pagination.models';
import { PaginationParamsDto } from '../core/dto/pagination.dto';
import { TypeStatistic } from './entities/type.view-entity';

@Controller('items')
export class ItemsController {

  constructor(
    private itemsService: ItemsService
  ) {
  }

  @Get()
  public getItems(@Query() dto: PaginationParamsDto): Promise<Pagination<Item[]>> {
    return this.itemsService.getItems(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public createItem(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(body);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  public updateItem(@Body() body: UpdateItemDto): Promise<Item> {
    return this.itemsService.updateItem(body);
  }

  @Delete(':id')
  public deleteItem(@Param() params: { id: number }): Promise<Item[]> {
    return this.itemsService.deleteItem(params.id);
  }

  @Get('statistic')
  public typesStatistic(@Query() query: PaginationParamsDto): Promise<Pagination<TypeStatistic[]>> {
    return this.itemsService.getStatistic(query);
  }

  @Post('mocks')
  public createMocks(@Body() { quantity }): Promise<Item[]> {
    return this.itemsService.createItems(quantity);
  }
}
