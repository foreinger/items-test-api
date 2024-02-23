import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParamsDto {
  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @Type(() => Number)
  public pageIndex: number = 0;

  @ApiPropertyOptional({ default: 5 })
  @IsNumber()
  @Type(() => Number)
  public pageSize: number = 5;
}
