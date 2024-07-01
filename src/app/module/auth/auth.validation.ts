import {z} from 'zod';


const loginValidationSchema=z.object({
    body:z.object({
        email:z.string({required_error:'Email is Required'}),
        password:z.string({required_error:'Password is Required'})
    })
});
const changePasswordValidationSchema=z.object({
    body:z.object({
        oldPassword:z.string({required_error:'Old Password is Required'}),
        newPassword:z.string()
    })
});

const emailDataValidation=z.object({
    body:z.object({
        emaildata:z.string()
    })
})




export const AuthAvalidation={
    loginValidationSchema,
    changePasswordValidationSchema,
    emailDataValidation
   
    
}