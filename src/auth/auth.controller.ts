import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { get } from 'http';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // login(@Body() dto: AuthDto);
  // or use pipes
  // @Body('name', ParseIntPipe) name: string,
  // @Body('password') password: string,

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
