import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from '../../../core/models/custom-http-exception.model';
import { ErrorTypes } from '../../../core/enums/error-types.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/auth.types';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public extractToken(authString: string): string | undefined {
    const [type, token] = authString?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      return token;
    }
    throw new CustomHttpException(ErrorTypes.invalidToken, HttpStatus.UNAUTHORIZED);
  }

  public verifyToken(token: string): Promise<TokenPayload> {
    const secret = this.configService.get<string>('SECRET');
    return this.jwtService.verifyAsync(token, { secret }).catch(this.jwtErrorHandler);
  }

  public jwtErrorHandler(err: any): void {
    throw new CustomHttpException(err.message, HttpStatus.UNAUTHORIZED);
  }
}
