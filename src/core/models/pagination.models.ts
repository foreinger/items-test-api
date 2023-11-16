import { PaginationDto, PaginationParamsDto } from '../dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationParams {
  public pageIndex: number;
  public pageSize: number;

  constructor(data: PaginationParamsDto | undefined) {
    this.pageIndex = data?.pageIndex ?? 0;
    this.pageSize = data?.pageSize ?? 5;
  }
}

export class Pagination<T> {
  @ApiProperty({ isArray: true, type: Object, description: 'items' })
  public data: T[];
  @ApiProperty()
  public pageIndex: number;
  @ApiProperty()
  public pageSize: number;
  @ApiProperty()
  public total: number;

  constructor(data: PaginationDto<T[]>) {
    this.data = data.data;
    this.pageSize = data.pageSize;
    this.pageIndex = data.pageIndex;
    this.total = data.total;
  }
}
