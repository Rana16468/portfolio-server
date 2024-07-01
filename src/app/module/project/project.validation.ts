import { z } from 'zod';

const createProjectSchema = z.object({
    body:z.object({
        src: z.string({required_error:"src is Required"}).url(),
        demo: z.string({required_error:"demo is Required"}).url(),
        code: z.string({required_error:"code is Required"}).url(),
        server: z.string({required_error:"server is Required"}).url()
    })
  });
  const updateProjectSchema = z.object({
    body:z.object({
        src: z.string({required_error:"src is Required"}).url().optional(),
        demo: z.string({required_error:"demo is Required"}).url().optional(),
        code: z.string({required_error:"code is Required"}).url().optional(),
        server: z.string({required_error:"server is Required"}).url().optional()
    })
  });
  
  export const ProjectValidation={
    createProjectSchema,
    updateProjectSchema
  }




