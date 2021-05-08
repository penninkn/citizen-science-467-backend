import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
  @Prop()
  username: string;
  @Prop()
  age: number;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  admin: boolean;
  @Prop()
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
