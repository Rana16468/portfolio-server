import express from 'express';
import auth from '../../middleware/auth';
import validationRequest from '../../middleware/validationRequest';
import { ProjectDetailsValidation } from './projectdetails.validation';
import { ProjectDetailsController } from './projectdetails.controller';


const router=express.Router();

router.post("/",auth(),validationRequest(ProjectDetailsValidation.projectDetailsSchema),ProjectDetailsController.createProjectDetails);
router.get("/",ProjectDetailsController.findAllProjectDetails);
router.get("/:id",ProjectDetailsController.findBySpecificProjectDetails);
router.patch("/:id",auth(),validationRequest(ProjectDetailsValidation.updateprojectDetailsSchema),ProjectDetailsController.updateProjectDetails);
router.delete("/:id",auth(),ProjectDetailsController.deleteProjectDetails);
export const ProjectDetailsRouter=router;