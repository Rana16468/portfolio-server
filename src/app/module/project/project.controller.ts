import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { ProjectServices } from "./project.server";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";




const createProject:RequestHandler=catchAsync(async(req,res)=>{

   
    const {id}=req.user;
    const result=await ProjectServices.createProjectIntoDb(req.body,id);
    sendRespone(res,{success:true, statusCode:httpStatus.CREATED,message:"Successfully Project Recorded", data:result})


});

const  findAllProject:RequestHandler=catchAsync(async(req,res)=>{

   const result=await ProjectServices.findAllProjectIntoDb();
   sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All Project",data:result});

});


const findBySpecificProject:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const result=await ProjectServices.findBySpecificProjectIntoDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find By The Specific Project",data:result});

});

const updateProject:RequestHandler=catchAsync(async(req,res)=>{

    const {id:userId}=req.user;
    const {id}=req.params;
    const result=await ProjectServices.updateProjectFromDb(req.body,userId,id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Updated Project",data:result});
});

const deleteProject:RequestHandler=catchAsync(async(req,res)=>{
    const {id:userId}=req.user;
    const {id}=req.params;
    const result=await ProjectServices.deleteProjectFromDb(userId,id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete Project",data:result});

})


export const ProjectController={
    createProject,
    findAllProject,
    findBySpecificProject,
    updateProject,
    deleteProject
}