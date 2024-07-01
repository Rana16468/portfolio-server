import express from 'express';
import { UserController } from './user.controller';
import validationRequest from '../../middleware/validationRequest';
import { UserValidation } from './user.validation';

const router=express.Router();

router.post("/", validationRequest(UserValidation.createValidationTUserSchema),  UserController.createUser);

export const UserRouter=router;