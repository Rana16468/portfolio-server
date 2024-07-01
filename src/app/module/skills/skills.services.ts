import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.modal";
import { TSkills } from "./skills.interface";
import { Skill } from "./skills.model";



const createSkillIntoDb=async(payload:TSkills,id:string)=>{

    const isUserExist=await User.isUserExistByPortfolio(id);
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const result=await Skill.create(payload);
    return result
}

const findAllSkillsIntoDb=async()=>{

    return await Skill.find();
}

const findSpecificSkillsIntoDb=async(id:string)=>{

    return await Skill.findById(id);
}

const updateSkillsFromDb=async(payload:Partial<TSkills>,userId:string,id:string)=>{


    const isUserExist=await User.isUserExistByPortfolio(userId);
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const isSkillsExist=await Skill.findById(id);
    if(!isSkillsExist){
        throw new AppError(httpStatus.NOT_FOUND,'This Skills Information Not Exist','');
    }

    const result=await Skill.findByIdAndUpdate(id,payload,{new:true,runValidators:true});
    return result;
}

const deleteSkillsFromDb=async(userId:string,id:string)=>{

    const isUserExist=await User.isUserExistByPortfolio(userId);
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const result=await Skill.deleteOne({_id:id});
    return result;
}



export const SkillsServices={
    createSkillIntoDb,
    findAllSkillsIntoDb,
    findSpecificSkillsIntoDb,
    updateSkillsFromDb,
    deleteSkillsFromDb
}