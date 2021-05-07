import { User } from './../users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Project } from 'src/projects/project.schema';
import * as mongoose from 'mongoose';
import { ProcessEnvOptions } from 'node:child_process';

export type ObservationDocument = Observation & Document;

@Schema()
export class Observation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;
}

export const ObservationSchema = SchemaFactory.createForClass(Observation);
