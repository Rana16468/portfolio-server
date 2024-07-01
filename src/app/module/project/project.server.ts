import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.modal";
import { TProjects } from "./project.interface";
import { Project } from "./project.model";
import mongoose from "mongoose";
import { Projectdetail } from "../projectdetails/projectdetails.model";



const createProjectIntoDb=async(payload:TProjects,id:string)=>{

    const isExistUser=await User.isUserExistByPortfolio(id);
    if(!isExistUser){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const isProjectAlredyExist=await Project.findOne({
        code:payload.code,
        demo:payload.demo,
        server:payload.server
    });
    if(isProjectAlredyExist){
        throw new AppError(httpStatus.FOUND,'This Project is Alredy Exist','');
    }
    
    const projectBuilder= new Project(payload);
    const result=await projectBuilder.save();
    
    return result
}

const findAllProjectIntoDb=async()=>{

    return await Project.find();
}

const findBySpecificProjectIntoDb=async(id:string)=>{

    return await Project.findById(id);
}

const updateProjectFromDb=async(payload:Partial<TProjects>,userId:string,id:string)=>{

    const isExistUser=await User.isUserExistByPortfolio(userId);
    if(!isExistUser){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const isExistProject=await Project.findById(id);
    if(!isExistProject){
        throw new AppError(httpStatus.NOT_FOUND,'This Project Not Exist','');
    }

    const result=await Project.findByIdAndUpdate(id,payload,{new:true,runValidators:true});
    return result;
}

const deleteProjectFromDb=async(userId:string,id:string)=>{
    const isExistUser=await User.isUserExistByPortfolio(userId);
    if(!isExistUser){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    // started transaction roll back 
    const session=await mongoose.startSession();
    try{

        session.startTransaction();
        const result=await Project.deleteOne({_id:id},{session});
        if(!result){
            throw new AppError(httpStatus.NOT_FOUND,'Project Session Failed','');
        }
        const prodectDetails=await Projectdetail.deleteOne({project:id},{session});
        if(!prodectDetails){
            throw new AppError(httpStatus.NOT_FOUND,'Project Details Session is Failed','');
        }
       
        await session.commitTransaction();
        await session.endSession();
        return prodectDetails;
     
    }
    catch(error){
        await session.abortTransaction();
        await session.endSession();
    }
    
}

export const ProjectServices={
    createProjectIntoDb,
    findAllProjectIntoDb,
    findBySpecificProjectIntoDb,
    updateProjectFromDb,
    deleteProjectFromDb
}
