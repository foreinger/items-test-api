import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorTypes } from '../types/error.types';

export class CustomHttpException extends HttpException {

  constructor({ errorType, message }: ErrorTypes, statusCode: HttpStatus) {
    super({ errorType, message, statusCode }, statusCode);
  }
}
