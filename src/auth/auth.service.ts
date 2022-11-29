import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel as pgInjectModel } from '@nestjs/sequelize';
import { AuthModel } from './auth.model';

const converter = require('xml-js');
const formatxml = require('xml-formatter');

@Injectable({})
export class AuthService {
  constructor(
    private config: ConfigService,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @pgInjectModel(AuthModel) private pgAuth: typeof AuthModel,
    private jwt: JwtService,
  ) {}

  async login(dto: AuthDto) {
    try {
      const user = await this.pgAuth.findOne({
        where: {
          name: dto.name,
        },
      });

      if (!user) throw new ForbiddenException('Credentials Incorrect');
      const verify = await argon.verify(user.dataValues.password, dto.password);
      if (!verify) throw new ForbiddenException('Credentials Incorrect');

      return this.signToken(dto.name, dto.password);
    } catch (error) {
      console.log({ error });
    }
  }

  async register(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      return await this.pgAuth.create({
        name: dto.name,
        password: hash,
      });
    } catch (error) {
      if (error.code == 11000)
        throw new ForbiddenException('Duplicate name found');
      throw error;
    }
  }

  async getUsers() {
    return await this.pgAuth.findAll();
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

  async jsonToxml(data: any) {
    const result = converter.json2xml(JSON.stringify(data), {
      compact: true,
    });
    const formattedXml = formatxml(result, {
      indentation: '  ',
      filter: (node: any) => node.type !== 'Comment',
      collapseContent: true,
      lineSeparator: '',
    });
    return formattedXml;
  }

  async xmlToJson(data: any) {
    const result = converter.xml2json(data, {
      compact: true,
    });
    return result;
  }
}
