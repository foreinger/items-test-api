import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorTypes } from '../enums/error-types.enum';

export class CustomHttpException extends HttpException {
  @ApiProperty({ enum: ErrorTypes })
  public errorType: ErrorTypes | string;
  @ApiProperty()
  public statusCode: number;
  @ApiProperty({ required: false })
  public validation?: ValidationError[];

  constructor(errorType: ErrorTypes | string, statusCode: HttpStatus, extras?: { [key: string]: any }) {
    super({ errorType, statusCode, ...extras }, statusCode);
  }
}

export class ValidationError {
  @ApiProperty()
  public property: string;
  @ApiProperty()
  public errorType: string;
}
