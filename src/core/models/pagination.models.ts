import { PaginationDto, PaginationParamsDto } from '../dto/pagination.dto';

export class PaginationParams {
  public pageIndex: number;
  public pageSize: number;

  constructor(data: PaginationParamsDto | undefined) {
    this.pageIndex = data?.pageIndex ?? 0;
    this.pageSize = data?.pageSize ?? 5;
  }
}

export class Pagination<T> {
  public data: T;
  public pageIndex: number;
  public pageSize: number;
  public total: number;

  constructor(data: PaginationDto<T>) {
    this.data = data.data;
    this.pageSize = data.pageSize;
    this.pageIndex = data.pageIndex;
    this.total = data.total;
  }
}
