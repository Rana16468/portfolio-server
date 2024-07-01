import express from 'express';
import auth from '../../middleware/auth';
import validationRequest from '../../middleware/validationRequest';
import { ProjectValidation } from './project.validation';
import { ProjectController } from './project.controller';

const router=express.Router();


router.post("/",auth(),validationRequest(ProjectValidation.createProjectSchema),ProjectController.createProject);
router.get("/",ProjectController.findAllProject);
router.get("/:id",ProjectController.findBySpecificProject);
router.patch("/:id",auth(),validationRequest(ProjectValidation.updateProjectSchema),ProjectController.updateProject);
router.delete("/:id",auth(),ProjectController.deleteProject);
export const  ProjectRouter=router;