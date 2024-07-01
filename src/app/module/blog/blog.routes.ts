import express from 'express';
import auth from '../../middleware/auth';
import validationRequest from '../../middleware/validationRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';

const router=express.Router();
router.post("/",auth(),validationRequest(BlogValidation.createBlogSchema),BlogController.createBlog);
router.get("/",BlogController.findAllBlog);
router.get("/:id",BlogController.findbySpecificBlogId);
router.patch("/:id",auth(),validationRequest(BlogValidation.updateBlogSchema),BlogController.updateBlog);
router.delete("/:id",auth(),BlogController.deleteBlog);
export const BlogRouter=router;