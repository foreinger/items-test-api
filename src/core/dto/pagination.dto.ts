export type PaginationParamsDto = {
  pageIndex: number;
  pageSize: number;
}

export type PaginationDto<T> = {
  data: T;
  total: number;
} & PaginationParamsDto

