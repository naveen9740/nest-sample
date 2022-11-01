import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';

@Injectable({})
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  // create
  async create(user: Auth): Promise<Auth> {
    const createUser = new this.authModel(user);
    return createUser.save();
  }

  //get
  async getUsers() {
    return this.authModel.find().exec();
  }

  //getSingle
  async getUser(id: mongoose.Types.ObjectId) {
    return this.authModel.findById(id);
  }

  //update
  async updateUser(id: mongoose.Types.ObjectId, data: object) {
    return this.authModel.findByIdAndUpdate(id, data, { new: true });
  }

  //delete
  async deleteUser(id: mongoose.Types.ObjectId) {
    const result = await this.authModel.findByIdAndDelete(id);
    if (result == null) {
      return { msg: 'user already deleted' };
    }
    return result;
  }
}
