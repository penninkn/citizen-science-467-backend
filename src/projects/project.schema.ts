import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  type: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
