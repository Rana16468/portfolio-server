import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendRespone from "../../utility/sendRespone";
import { SkillsServices } from "./skills.services";
import { RequestHandler } from "express";


const  createSkillIntoDb:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.user;
    const result=await SkillsServices.createSkillIntoDb(req.body,id);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Skills Recorded", data:result});
});

const findAllSkills:RequestHandler=catchAsync(async(req,res)=>{

    const result=await SkillsServices.findAllSkillsIntoDb();
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All Recored", data:result});
});

const findSpecificSkills:RequestHandler=catchAsync(async(req,res)=>{

    const result=await SkillsServices.findSpecificSkillsIntoDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find By The Specific Skills", data:result})
});

const updateSkills:RequestHandler=catchAsync(async(req,res)=>{

    const {id:userId}=req.user;
    const {id}=req.params;
    const result=await SkillsServices.updateSkillsFromDb(req.body,userId,id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Updated Skills", data:result});
});

const  deleteSkills:RequestHandler=catchAsync(async(req,res)=>{
    const {id:userId}=req.user;
    const {id}=req.params;
    const result=await SkillsServices.deleteSkillsFromDb(userId,id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete Skills", data:result});
});
export const SkillsController={
    createSkillIntoDb,
    findAllSkills,
    findSpecificSkills,
    updateSkills,
    deleteSkills
}