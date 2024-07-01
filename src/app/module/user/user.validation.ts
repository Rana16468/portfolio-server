import { z } from 'zod';

//const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
/*password: z.string().refine((value) => passwordRegex.test(value), {
      message: 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)',
    }) */
const createValidationTUserSchema = z.object({
 body:z.object({
    username: z.string().min(1).max(30),
    email: z.string().email(),
    password: z.string(),
 })
});


export const UserValidation={
    createValidationTUserSchema
    
}