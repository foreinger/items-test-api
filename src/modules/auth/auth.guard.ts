import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { TokenPayload } from './types/auth.types';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService
  ) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.tokenService.extractToken(request?.headers?.authorization);
    const user: TokenPayload = await this.tokenService.verifyToken(token);
    if ('sub' in user) {
      request['user'] = user;
    }

    return Boolean(request['user']);
  }


}
