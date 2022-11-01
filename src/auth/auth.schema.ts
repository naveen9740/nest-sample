import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  age: number;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
