import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ResponseDto } from './response.dto';

export class PaginationDto<T> extends ResponseDto<T> {
  @ApiProperty()
  public total: number;

  @ApiProperty()
  public pageIndex?: number;

  @ApiProperty()
  public pageSize?: number;

  constructor(input: any) {
    super(input.data);
    this.total = input.total;
    this.pageSize = input.pageSize;
    this.pageIndex = input.pageIndex;
  }
}
