import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
// @ApiBearerAuth('token')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getUser(@Request() req) {
    console.log('RRRRRRR', req);
    return req.user;
  }
}
