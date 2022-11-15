import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';

@Injectable({})
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  login() {
    return 'login';
  }
  register() {
    return 'register';
  }
}
