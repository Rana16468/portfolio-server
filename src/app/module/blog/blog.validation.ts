import { z } from 'zod';


// Define the Zod schema based on the Mongoose schema
const createBlogSchema = z.object({
   body:z.object({
    title: z.string({required_error:"title is Required"}),
    content: z.string({required_error:"comtent is Required"}),
    photo: z.string().url(),
    subjectname: z.string()
   })
   
});

const updateBlogSchema = z.object({
    body:z.object({
     title: z.string({required_error:"title is Required"}).optional(),
     content: z.string({required_error:"comtent is Required"}).optional(),
     photo: z.string().url().optional(),
     subjectname: z.string().optional()
    })
    
 });

 export const BlogValidation={
    createBlogSchema,
    updateBlogSchema
 }