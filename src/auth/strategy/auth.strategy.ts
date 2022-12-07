import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth, AuthDocument } from '../auth.schema';
import { AuthModel } from '../auth.model';
import { InjectModel as pgInjectModel } from '@nestjs/sequelize';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @pgInjectModel(AuthModel) private pgAuth: typeof AuthModel, // @InjectModel(Auth.name) private authModel: Model<AuthDocument>, // @InjectModel(AuthModel.name) private authModel: any,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ABC',
    });
  }

  async validate(payload: any) {
    console.log('RRRRR', payload);
    // this will send data in req.user
    // const user = await this.authModel.find({ username: payload.username });
    const user = await this.pgAuth.findOne({
      where: { name: payload.name },
    });
    console.log('USER', user);
    return user;
  }
}
