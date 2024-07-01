import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { BlogServices } from "./blog.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";



const createBlog:RequestHandler=catchAsync(async(req,res)=>{


    const {id:userId}=req.user;

    const result=await BlogServices.createBlogIntoDb(req.body,userId);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Create Blog Successfully",data:result});
});

const findAllBlog:RequestHandler=catchAsync(async(req,res)=>{

    const result=await BlogServices.findAllBlogIntoDb();
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All Blog ",data:result});
});

const findbySpecificBlogId:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const result=await BlogServices.findbySpecificBlogIdIntoDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All Blog ",data:result});
});

const  updateBlog:RequestHandler=catchAsync(async(req,res)=>{

    const {id:userId}=req.user;
    const {id}=req.params;
    const result=await BlogServices.updateBlogFromDb(req.body,userId,id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Updated Blog Successfully",data:result});
});

const  deleteBlog:RequestHandler=catchAsync(async(req,res)=>{

    const {id:userId}=req.user;
    const {id}=req.params;
    const result=await BlogServices.deleteBlogFromDb(userId,id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:" Blog Deleted Successfully",data:result});
})



export const BlogController={
    createBlog,findAllBlog,findbySpecificBlogId, updateBlog, deleteBlog
}