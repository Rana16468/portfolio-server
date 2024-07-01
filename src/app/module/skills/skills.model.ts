import  { Schema, model } from "mongoose";
import { TSkills } from "./skills.interface";


// Define the Mongoose schema based on the TSkills interface
  const skillSchema: Schema = new Schema({
    src: { type: String, required: true },
    title: { type: String, required: true, unique:true },
    style: {
      type: String,
      required: true,
      enum: ['shadow-orange-500', 'shadow-blue-500', 'shadow-yellow-500', 'shadow-sky-400', 'shadow-gray-400']
    },
    isDeleted: { type: Boolean, default: false }
  },{
    timestamps:true
  });
  

  export const Skill = model<TSkills>('Skill', skillSchema);
