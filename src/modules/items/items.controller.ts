import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Item } from '../../entities/item.entity';
import { ItemsService } from './items.service';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { Pagination } from '../../core/models/pagination.models';
import { PaginationParamsDto } from '../../core/dto/pagination.dto';
import { TypeStatistic } from '../../entities/type-view.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('items')
@UseGuards(AuthGuard)
@Controller('items')
export class ItemsController {

  constructor(
    private itemsService: ItemsService
  ) {
  }

  @ApiOkResponse({ type: Pagination<Item> })
  @Get()
  public getItems(@Query() dto: PaginationParamsDto): Promise<Pagination<Item>> {
    return this.itemsService.getItems(dto);
  }


  @ApiOkResponse({ type: Item })
  @Post()
  @UsePipes(new ValidationPipe())
  public createItem(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(body);
  }

  @ApiOkResponse({ type: Item })
  @Patch()
  public updateItem(@Body() body: UpdateItemDto): Promise<Item> {
    return this.itemsService.updateItem(body);
  }

  @ApiOkResponse({ type: Item })
  @Delete(':id')
  public deleteItem(@Param() params: { id: number }): Promise<Item> {
    return this.itemsService.deleteItem(params.id);
  }

  @ApiOkResponse({ type: Pagination <TypeStatistic> })
  @Get('statistic')
  public typesStatistic(@Query() query: PaginationParamsDto): Promise<Pagination<TypeStatistic>> {
    return this.itemsService.getStatistic(query);
  }

  @ApiOkResponse({ type: Item, isArray: true })
  @Post('mocks')
  public createMocks(@Body() { quantity }): Promise<Item[]> {
    return this.itemsService.generateMockItems(quantity);
  }
}
