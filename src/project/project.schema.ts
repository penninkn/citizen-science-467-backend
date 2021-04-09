import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  title: String,
  created_at: { type: Date, default: Date.now },
});
