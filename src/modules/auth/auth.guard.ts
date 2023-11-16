import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthErrors } from './enums/auth.enums';
import { CustomHttpException } from '../../core/models/error.models';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const user = await this.verifyToken(token);
    if (user) {
      request['user'] = user;
    }

    return Boolean(user);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      return token;
    }
    throw new CustomHttpException({ errorType: AuthErrors.invalidToken }, HttpStatus.UNAUTHORIZED);
  }

  private verifyToken(token: string): Promise<Record<string, any>> {
    const secret = this.configService.get<string>('SECRET');
    return this.jwtService
      .verifyAsync(token, { secret })
      .catch(this.jwtErrorHandler);
  }

  private jwtErrorHandler(err: any): void {
    switch (err.message as AuthErrors) {
      case AuthErrors.invalidToken:
        throw new CustomHttpException({ errorType: AuthErrors.invalidToken }, HttpStatus.UNAUTHORIZED);
      case AuthErrors.expiredToken:
        throw new CustomHttpException({ errorType: AuthErrors.expiredToken }, HttpStatus.UNAUTHORIZED);
      default:
        throw new CustomHttpException({ errorType: err.message }, HttpStatus.UNAUTHORIZED);
    }
  }
}
