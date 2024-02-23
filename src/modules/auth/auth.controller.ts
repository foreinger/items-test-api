import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginFormDto } from './dto/login-form-dto';
import { RegistrationFormDto } from './dto/registration-form-dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ApiErrorResponse } from '../../core/decorators/swagger.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOkResponse({ type: () => AuthResponseDto })
  @ApiErrorResponse()
  public register(@Body() body: RegistrationFormDto): Promise<AuthResponseDto> {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOkResponse({ type: () => AuthResponseDto })
  @ApiErrorResponse()
  public login(@Body() body: LoginFormDto): Promise<AuthResponseDto> {
    return this.authService.signIn(body);
  }
}
