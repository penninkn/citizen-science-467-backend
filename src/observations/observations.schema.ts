import { User } from './../users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ObservationDocument = Observation & Document;

@Schema()
export class Observation {
  @Prop()
  user: User;
  @Prop()
  title: string;
  @Prop()
  text: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  longitude: string;
  @Prop()
  latitude: string;
  @Prop()
  date: Date;
  @Prop()
  rating: number;
}

export const ObservationSchema = SchemaFactory.createForClass(Observation);
