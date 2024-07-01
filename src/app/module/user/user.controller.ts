import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";
import { UserServices } from "./user.services";


const createUser:RequestHandler=catchAsync(async(req,res)=>{

    const result=await UserServices.createUserIntoDb(req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Create Account", data:result})

});

export const UserController={
    createUser
}