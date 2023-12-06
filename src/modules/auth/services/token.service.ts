import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from '../../../core/models/error.models';
import { AuthErrors } from '../enums/auth.enums';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/auth.types';

@Injectable()
export class TokenService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }

  public extractToken(authString: string): string | undefined {
    const [type, token] = authString?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      return token;
    }
    throw new CustomHttpException({ errorType: AuthErrors.invalidToken }, HttpStatus.UNAUTHORIZED);
  }

  public verifyToken(token: string): Promise<TokenPayload> {
    const secret = this.configService.get<string>('SECRET');
    return this.jwtService
      .verifyAsync(token, { secret })
      .catch(this.jwtErrorHandler);
  }

  public jwtErrorHandler(err: any): void {
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
