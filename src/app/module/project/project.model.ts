import { Schema, model } from 'mongoose';
import { TProjects } from './project.interface';


const projectSchema: Schema = new Schema({
    src: { type: String, required: true },
    demo: { type: String, required: true },
    code: { type: String, required: true },
    server: { type: String, required: true }
  }, {
    timestamps: true
  });
  export const Project = model<TProjects>('Project', projectSchema);