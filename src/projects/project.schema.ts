import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Observation } from '../observations/observations.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }],
  })
  observations: Observation[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
