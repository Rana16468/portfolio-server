import { z } from 'zod';

const SkillValidationSchema = z.object({
       body:z.object({
        src: z.string({invalid_type_error:"src is required"}).url(),
        title: z.string({invalid_type_error:"title is required"}),
         style: z.enum(['shadow-orange-500', 'shadow-blue-500', 'shadow-yellow-500',  'shadow-sky-400', 'shadow-gray-400' ]),
         isDeleted: z.boolean().optional(),
    })
  });

  const UpdateSkillsValidationSchema=z.object({
    body:z.object({
        src: z.string({invalid_type_error:"src is required"}).url().optional(),
        title: z.string({invalid_type_error:"title is required"}).optional(),
         style: z.enum(['shadow-orange-500', 'shadow-blue-500', 'shadow-yellow-500',  'shadow-sky-400', 'shadow-gray-400' ]).optional(),
         isDeleted: z.boolean().optional(),
    })
  })



export const SkillsValidation={
    SkillValidationSchema ,
    UpdateSkillsValidationSchema
}