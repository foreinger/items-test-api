import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import * as process from 'process';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET
      // signOptions: { expiresIn: '10s' }
    }),
    UserModule
  ],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
  exports: [AuthService, TokenService]
})
export class AuthModule {
}
