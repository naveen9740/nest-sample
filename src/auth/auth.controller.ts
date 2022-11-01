import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import mongoose from 'mongoose';

import { Auth } from './auth.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  async create(@Body() userDto: Auth) {
    return this.authService.create(userDto);
  }

  @Get('get-users')
  async getUsers() {
    return this.authService.getUsers();
  }

  @Get('get-user/:id')
  async getUser(@Param('id') id: mongoose.Types.ObjectId) {
    return this.authService.getUser(id);
  }

  @Put('update-user/:id')
  async updateUser(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() data: Auth,
  ) {
    return this.authService.updateUser(id, data);
  }

  @Delete('del-user/:id')
  async deleteUser(@Param('id') id: mongoose.Types.ObjectId) {
    return this.authService.deleteUser(id);
  }
}
