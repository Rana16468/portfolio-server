import express from 'express';
import auth from '../../middleware/auth';
import validationRequest from '../../middleware/validationRequest';
import { SkillsValidation } from './skills.validation';
import { SkillsController } from './skills.controller';

const router=express.Router();

router.post("/",auth(),validationRequest(SkillsValidation.SkillValidationSchema),SkillsController.createSkillIntoDb);
router.get("/",SkillsController.findAllSkills);
router.get("/:id",SkillsController.findSpecificSkills);
router.patch("/:id",auth(),validationRequest(SkillsValidation.UpdateSkillsValidationSchema),SkillsController.updateSkills);
router.delete("/:id",auth(),SkillsController.deleteSkills);

export const SkillsRouter=router;