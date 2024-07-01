import { z } from 'zod';


// Define the Zod schema for TProjectDetails
const projectDetailsSchema = z.object({
 body:z.object({
    project: z.string({required_error:"project Id is Requred"}),
    src: z.string({required_error:"src is Required"}).url(),
    projecttype: z.string({required_error:"project types  is Requred"}),
    statingTime: z.string({required_error:"startingTime   is Requred"}),
    enddingTime: z.string({required_error:"endingTime is Requred"}),
    feature: z.enum(['Payment GetWay', 'Account Types']),
    featureDiscription: z.string({required_error:"featureDiscription is Requred"}),
    responsiveDesign: z.string({required_error:"responsiveDesign is Requred"}),
    technologiesUsed: z.string({required_error:"technologiesUsed is Requred"}),
 })
});

const updateprojectDetailsSchema=z.object({
    body:z.object({
        projecttype: z.string({required_error:"project types  is Requred"}).optional(),
        src: z.string({required_error:"src is Required"}).url().optional(),
        statingTime: z.string({required_error:"startingTime   is Requred"}).optional(),
        enddingTime: z.string({required_error:"endingTime is Requred"}).optional(),
        feature: z.enum(['Payment GetWay', 'Account Types']).optional(),
        featureDiscription: z.string({required_error:"featureDiscription is Requred"}).optional(),
        responsiveDesign: z.string({required_error:"responsiveDesign is Requred"}).optional(),
        technologiesUsed: z.string({required_error:"technologiesUsed is Requred"}).optional(),
     })
});

export const ProjectDetailsValidation={
    projectDetailsSchema,
    updateprojectDetailsSchema
}