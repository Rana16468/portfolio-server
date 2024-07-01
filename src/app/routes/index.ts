import express from 'express';
import { UserRouter } from '../module/user/user.routes';
import { AuthRouter } from '../module/auth/auth.routes';
import { SkillsRouter } from '../module/skills/skills.routes';
import { ProjectRouter } from '../module/project/project.routes';
import { ProjectDetailsRouter } from '../module/projectdetails/projectdetails.routes';
import { BlogRouter } from '../module/blog/blog.routes';


const router=express.Router();
const moduleRouth=[
    {path:'/user',route:UserRouter},
    {path:"/auth",route:AuthRouter},
    {path:"/skill",route:SkillsRouter},
    {path:"/project",route:ProjectRouter},
    {path:"/projectdetails",route:ProjectDetailsRouter},
    {path:"/blog",route:BlogRouter}
  
    
]

moduleRouth.forEach((v)=>router.use(v.path,v.route));

export default router;