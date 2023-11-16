import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class PaginationParamsDto {
  @ApiPropertyOptional()
  pageIndex?: number;
  @ApiPropertyOptional()
  pageSize?: number;
}

export class PaginationDto<T> extends PaginationParamsDto {

  @ApiResponseProperty()
  data: T;

  @ApiResponseProperty()
  total: number;

  @ApiResponseProperty()
  pageIndex?: number;

  @ApiResponseProperty()
  pageSize?: number;
}

