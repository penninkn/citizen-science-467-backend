import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Observation } from 'src/observations/observations.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;

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
