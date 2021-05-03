import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Observation } from 'src/observations/observations.schema';
import * as mongoose from 'mongoose';

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

  @Prop()
  active: boolean;

  @Prop()
  createdDate: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
