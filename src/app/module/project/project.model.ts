import { Schema, model } from 'mongoose';
import { TProjects } from './project.interface';


const projectSchema: Schema = new Schema({
    src: { type: String, required: true, index:true  },
    demo: { type: String, required: true, index:true  },
    code: { type: String, required: true, index:true },
    server: { type: String, required: true, index:true }
  }, {
    timestamps: true
  });
  export const Project = model<TProjects>('Project', projectSchema);