import { Schema, model } from 'mongoose';
import { TProjectDetails } from './projectdetails.interface';

// Define the Mongoose schema based on the TSkills interface
const ProjectDetailsSchema: Schema = new Schema<TProjectDetails>({

    project:{
        type:Schema.Types.ObjectId,
        ref:'Project',
        trim:true,
        unique:true,
        required:[true,'Project is Required']
    },
    src: { type: String, required: true },
    projecttype: { type: String, required: true },
    statingTime: { type: String, required: true },
    enddingTime: { type: String, required: true },
    feature: { 
      type: String, 
      required: true, 
      enum: ['Payment GetWay', 'Account Types'] 
    },
    featureDiscription: { type: String, required: true },
    responsiveDesign: { type: String, required: true },
    technologiesUsed: { type: String, required: true }
  }, {
    timestamps: true
  });
  
  // Create and export the Mongoose model
  export const Projectdetail = model<TProjectDetails>('Projectdetail', ProjectDetailsSchema);