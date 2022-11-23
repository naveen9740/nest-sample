import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private config: ConfigService,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private jwt: JwtService,
  ) {}

  async login(dto: AuthDto) {
    try {
      const user = await this.authModel.find({ name: dto.name });
      if (!user) throw new ForbiddenException('Credentials Incorrect');
      const verify = await argon.verify(user[0].password, dto.password);
      if (!verify) throw new ForbiddenException('Credentials Incorrect');

      return this.signToken(dto.name, dto.password);
    } catch (error) {
      console.log({ error });
    }
  }

  async register(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = new this.authModel({ name: dto.name, password: hash });
      return await user.save();
    } catch (error) {
      if (error.code == 11000)
        throw new ForbiddenException('Duplicate name found');
      throw error;
    }
  }

  async getUsers() {
    return this.authModel.find().exec();
  }

  async signToken(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      username,
      password,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = this.jwt.sign(payload, { expiresIn: '6000s', secret });
    return {
      access_token: token,
    };
  }
}
