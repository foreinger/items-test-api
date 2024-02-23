import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginFormDto } from '../dto/login-form-dto';
import { RegistrationFormDto } from '../dto/registration-form-dto';
import { UserEntity } from '../../../entities/user.entity';
import { TokenPayload } from '../types/auth.types';
import { ConfigService } from '@nestjs/config';
import { CustomHttpException } from '../../../core/models/custom-http-exception.model';
import { ErrorTypes } from '../../../core/enums/error-types.enum';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async register(dto: RegistrationFormDto): Promise<AuthResponseDto> {
    const me: UserEntity = await this.userService.createUser(dto);

    const payload: TokenPayload = { sub: me.id, username: me.username };
    const options = { secret: this.configService.get('SECRET') };
    const token = await this.jwtService.signAsync(payload, options);
    return { token, me };
  }

  public async signIn(dto: LoginFormDto): Promise<AuthResponseDto> {
    const me: UserEntity = await this.userService.findOneByUsername(dto.username);
    if (!me) {
      throw new CustomHttpException(ErrorTypes.invalidCredentials, HttpStatus.NOT_FOUND);
    }

    if (!(await me.comparePassword(dto.password))) {
      throw new CustomHttpException(ErrorTypes.invalidCredentials, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const payload = { sub: me.id, username: me.username };
    const options = { secret: this.configService.get('SECRET') };
    const token = await this.jwtService.signAsync(payload, options);

    return { token, me };
  }
}
