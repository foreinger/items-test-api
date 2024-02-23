import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from '@nestjs/jwt';
import { CustomHttpException } from '../../../core/models/custom-http-exception.model';
import { ErrorTypes } from '../../../core/enums/error-types.enum';

@Injectable()
export class AuthHttpGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  // Handle 401 exception from auth strategy
  public handleRequest(err: any, user: any, info: any, context: any, status: any): any {
    if (info instanceof JsonWebTokenError) {
      throw new CustomHttpException(ErrorTypes.invalidToken, HttpStatus.UNAUTHORIZED);
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
