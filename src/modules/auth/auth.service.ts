import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { User } from '../../entities/user.entity';
import { AuthResponseDto } from './types/auth.types';
import { ConfigService } from '@nestjs/config';
import { CustomHttpException } from '../../core/models/error.models';
import { AuthErrors } from './enums/auth.enums';

@Injectable()
export class AuthService {

  private validate;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }

  public async register(dto: RegistrationDto): Promise<AuthResponseDto> {
    const me: User = await this.userService.createUser(dto);

    const payload = { sub: me.id, username: me.username };
    const options = { secret: this.configService.get('SECRET') };
    const token = await this.jwtService.signAsync(payload, options);
    return { token, me };
  }

  public async signIn(dto: LoginDto): Promise<AuthResponseDto> {
    const me: User = await this.userService.findUser(dto.username);
    if (!me) {
      throw new CustomHttpException({ errorType: AuthErrors.invalidCredentials }, HttpStatus.NOT_FOUND);
    }

    if (!(await me.comparePassword(dto.password))) {
      throw new CustomHttpException({ errorType: AuthErrors.invalidCredentials }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const payload = { sub: me.id, username: me.username };
    const options = { secret: this.configService.get('SECRET') };
    const token = await this.jwtService.signAsync(payload, options);
    return { token, me };
  }
}
