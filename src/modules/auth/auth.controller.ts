import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {
  }

  @Post('register')
  public register(@Body() body: RegistrationDto): Promise<any> {
    return this.authService.register(body);
  }

  @Post('login')
  public login(@Body() body: LoginDto): Promise<any> {
    return this.authService.signIn(body);
  }
}
