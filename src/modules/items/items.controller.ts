import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ItemEntity } from '../../entities/item.entity';
import { ItemsService } from './items.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TypeEntity } from '../../entities/type.entity';
import { CreateItemDto } from './dto/item-create.dto';
import { UpdateItemDto } from './dto/item-update.dto';
import { AutocompleteDto } from './dto/type-autocomplete.dto';
import { TypeStatisticDto } from './dto/type-statistic.dto';
import { ResponseDto } from '../../core/dto/response.dto';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { PaginationParamsDto } from '../../core/dto/pagination-params.dto';
import { ItemDto } from './dto/item.dto';
import { ApiArrayResponse, ApiErrorResponse, ApiObjectResponse, ApiPaginatedResponse } from '../../core/decorators/swagger.decorator';
import { ItemDeleteDto } from './dto/item-delete.dto';
import { AuthHttpGuard } from '../auth/guards/auth-http-guard.service';
import { HttpTokenData } from '../../core/decorators/token-data.decorator';
import { TokenPayload } from '../auth/types/auth.types';

@ApiBearerAuth()
@ApiTags('items')
@UseGuards(AuthHttpGuard)
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  @ApiPaginatedResponse(ItemDto)
  @ApiErrorResponse()
  public getItems(@Query() dto: PaginationParamsDto): Promise<PaginationDto<ItemDto>> {
    return this.itemsService.getItems(dto);
  }

  @Post()
  @ApiObjectResponse(ItemDto)
  @ApiErrorResponse()
  public createItem(@Body() body: CreateItemDto, @HttpTokenData() tokenPayload: TokenPayload): Promise<ResponseDto<ItemDto>> {
    return this.itemsService.createItem(body, tokenPayload);
  }

  @Patch()
  @ApiObjectResponse(ItemDto)
  @ApiErrorResponse()
  public updateItem(@Body() body: UpdateItemDto): Promise<ResponseDto<ItemDto>> {
    return this.itemsService.updateItem(body);
  }

  @Delete(':id')
  @ApiObjectResponse(ItemDto)
  @ApiErrorResponse()
  public deleteItem(@Param() params: ItemDeleteDto): Promise<ResponseDto<ItemDto>> {
    return this.itemsService.deleteItem(params.id);
  }

  @Get('types-autocomplete')
  @ApiArrayResponse(TypeEntity)
  @ApiErrorResponse()
  public typesAutocomplete(@Query() query: AutocompleteDto): Promise<ResponseDto<TypeEntity[]>> {
    return this.itemsService.getTypesAutocomplete(query.input);
  }

  @Get('statistic')
  @ApiPaginatedResponse(TypeStatisticDto)
  @ApiErrorResponse()
  public typesStatistic(@Query() query: PaginationParamsDto): Promise<PaginationDto<TypeStatisticDto>> {
    return this.itemsService.getStatistic(query);
  }
}
