import { HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { CustomHttpException } from '../models/custom-http-exception.model';
import { ErrorTypes } from '../enums/error-types.enum';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      exceptionFactory: CustomValidationPipe.exceptionFactory,
    });
  }

  public static exceptionFactory(validationErrors: ValidationError[]): CustomHttpException {
    const validation = validationErrors.map((error) => ({
      property: error.property,
      errorType: Object.keys(error.constraints)[0],
    }));

    return new CustomHttpException(ErrorTypes.invalidData, HttpStatus.BAD_REQUEST, { validation });
  }
}
