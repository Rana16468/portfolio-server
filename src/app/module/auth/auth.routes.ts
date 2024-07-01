import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { AuthAvalidation } from './auth.validation';
import { LoginUserController } from './auth.controller';
import auth from '../../middleware/auth';



const router=express.Router();
router.post("/login",validationRequest(AuthAvalidation.loginValidationSchema),LoginUserController.loginUser);
router.post("/chnage_password",auth(),validationRequest(AuthAvalidation.changePasswordValidationSchema),LoginUserController.changePassword);
router.post("/my_contact",validationRequest(AuthAvalidation.emailDataValidation),LoginUserController.contact_me_send_email);
export const AuthRouter=router;