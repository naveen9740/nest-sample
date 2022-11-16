import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @Prop({ unique: true })
  name: string;

  @Prop()
  password: string;
}
// select: false --> to hide data.
export const AuthSchema = SchemaFactory.createForClass(Auth);
