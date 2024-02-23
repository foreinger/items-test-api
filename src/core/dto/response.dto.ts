import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  public data: T;

  constructor(input: any) {
    this.data = input;
  }
}
