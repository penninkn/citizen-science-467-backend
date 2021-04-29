import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ObservationDocument = Observation & Document;

@Schema()
export class Observation {
  @Prop()
  title: string;
  text: string;
}

export const ObservationSchema = SchemaFactory.createForClass(Observation);
