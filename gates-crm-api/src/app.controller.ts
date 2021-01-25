import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

// eslint-disable-next-line prettier/prettier
import { Controller, Request, Post, UseGuards, Get, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/public.decorator';
import { ValidationPipe } from './shared/validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  // @UseGuards(LocalAuthGuard) // cant use guard
  @Post('auth/register')
  async registerUser(@Request() req) {
    console.log(req);
    return this.authService.register(req.body);
  }
}
