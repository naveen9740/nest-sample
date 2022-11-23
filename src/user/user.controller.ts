import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('me')
  getUser(@GetUser('name') name: number, @GetUser() user: any) {
    return { name, user };
  }
}
