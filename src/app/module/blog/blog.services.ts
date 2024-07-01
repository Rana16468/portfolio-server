import httpStatus from "http-status";
import { User } from "../user/user.modal";
import { TBlog } from "./blog.interface";
import AppError from "../../error/AppError";
import { Blog } from "./blog.mode";


const createBlogIntoDb=async(payload:TBlog,userId:string)=>{

    const isExistUser=await User.isUserExistByPortfolio(userId);
    if(!isExistUser){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const buildBlog= new Blog(payload);
    const result=await buildBlog.save();
    return result

}

const findAllBlogIntoDb=async()=>{

    const result=await Blog.find().sort({ createdAt: -1 });;
    return result;
}
const findbySpecificBlogIdIntoDb=async(id:string)=>{

 return await Blog.findById(id);
}

const updateBlogFromDb=async(payload:Partial<TBlog>,userId:string,id:string)=>{

    const isExistUser=await User.isUserExistByPortfolio(userId);
    if(!isExistUser){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const isExistBlog=await Blog.findById(id);
    if(!isExistBlog){
        throw new AppError(httpStatus.NOT_FOUND,'This Blog Not Exist','');
    }
    const result=await Blog.findByIdAndUpdate(id,payload,{new:true,runValidators:true});
    return result;
}

const deleteBlogFromDb=async(userId:string,id:string)=>{
    const isExistUser=await User.isUserExistByPortfolio(userId);
    if(!isExistUser){
        throw new AppError(httpStatus.NOT_FOUND,'This User Not Exist','');
    }
    const result=await Blog.deleteOne({_id:id});
    return result;
}

export const BlogServices={
    createBlogIntoDb,
    findAllBlogIntoDb,
    findbySpecificBlogIdIntoDb,
    updateBlogFromDb,
    deleteBlogFromDb


}