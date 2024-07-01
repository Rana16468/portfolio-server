import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { ProjectDetailsService } from "./projectdetails.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const  createProjectDetails:RequestHandler=catchAsync(async(req,res)=>{

    const {id:userId}=req.user;
    const result=await ProjectDetailsService.createProjectDetailsIntoDb(req.body,userId);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Create Project Deatils",data:result});
});

const findAllProjectDetails:RequestHandler=catchAsync(async(req,res)=>{

    const result=await ProjectDetailsService.findAllProjectDetailsIntoDb();
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Find All Project Details",data:result});
});

const  findBySpecificProjectDetails:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const result=await ProjectDetailsService.findBySpecificProjectDetailsIntoDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Find Specified Project Details",data:result});
});

const updateProjectDetails:RequestHandler=catchAsync(async(req,res)=>{

    const {id:userId}=req.user;
    const {id}=req.params;
    const result=await ProjectDetailsService.updateProjectDetailsFromDb(req.body,userId,id);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Updated Project Details",data:result})


});

const   deleteProjectDetails:RequestHandler=catchAsync(async(req,res)=>{

    const {id:userId}=req.user;
    const {id}=req.params;
    const result=await ProjectDetailsService.deleteProjectDetailsFromDb(userId,id);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Deleted Project Details",data:result})
})

export const ProjectDetailsController={
    createProjectDetails,
    findAllProjectDetails,
    findBySpecificProjectDetails,
    updateProjectDetails,
    deleteProjectDetails
}