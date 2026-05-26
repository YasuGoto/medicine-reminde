import { Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: { email: string; password: string }) {
    return this.authService.register(registerDto.email, registerDto.password);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Headers('authorization') token: string) {
    return this.authService.logout(token.split(' ')[1]);
  }
}
