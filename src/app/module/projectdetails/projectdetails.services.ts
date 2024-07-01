import httpStatus from "http-status";
import { User } from "../user/user.modal";
import { TProjectDetails } from "./projectdetails.interface";
import AppError from "../../error/AppError";
import { Project } from "../project/project.model";
import { Projectdetail } from "./projectdetails.model";


const createProjectDetailsIntoDb=async(payload:TProjectDetails,id:string)=>{

    const isExistUser=await User.isUserExistByPortfolio(id);
    if(!isExistUser){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const isProjectExist=await Project.findById(payload.project);
    if(!isProjectExist){
        throw new AppError(httpStatus.NOT_FOUND,'This Project Not Exist','');
    }

    const buildProjectdetails= new Projectdetail(payload);
    const result=await buildProjectdetails.save();
    return result;

}

const findAllProjectDetailsIntoDb=async()=>{
    

    const result=await Projectdetail.find().populate('project');
    return result;
}
const  findBySpecificProjectDetailsIntoDb=async(id:string)=>{

    
    const  result=await Projectdetail.findOne({project:id}).populate('project');;
    return result
}

const updateProjectDetailsFromDb=async(payload:Partial<TProjectDetails>,userId:string,id:string)=>{

    const isExistUser=await User.isUserExistByPortfolio(userId);
    if(!isExistUser){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const isProjectDeatisExist=await Projectdetail.findById(id);
    if(!isProjectDeatisExist){
        throw new AppError(httpStatus.NOT_FOUND,'This Project Details is Not Exist','');
    }

    const result=await Projectdetail.findByIdAndUpdate(id,payload,{new:true,runValidators:true});
    return result;
}

const deleteProjectDetailsFromDb=async(userId:string,id:string)=>{

    const isExistUser=await User.isUserExistByPortfolio(userId);
    if(!isExistUser){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }

    const result=await Projectdetail.deleteOne({_id:id});
    return result;
}

export const ProjectDetailsService={
    createProjectDetailsIntoDb,
    findAllProjectDetailsIntoDb,
    findBySpecificProjectDetailsIntoDb,
    updateProjectDetailsFromDb,
    deleteProjectDetailsFromDb
}