import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Observation } from 'src/observations/observations.schema';
import * as mongoose from 'mongoose';

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
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }],
  })
  observations: Observation[];
}

export const UserSchema = SchemaFactory.createForClass(User);
