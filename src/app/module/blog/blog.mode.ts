import { Schema, model } from 'mongoose';
import { TBlog } from './blog.interface';

// Define the Mongoose schema based on the TBlog interface
const blogSchema: Schema = new Schema<TBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    photo: { type: String, required: true },
    subjectname: { type: String, required: true }
  }, {
    timestamps: true
  });
  
  // Create and export the Mongoose model
  export const Blog = model<TBlog>('Blog', blogSchema);