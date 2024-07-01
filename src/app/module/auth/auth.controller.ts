import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { AuthService } from "./auth.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";





const loginUser:RequestHandler=catchAsync(async(req,res)=>{
    const data=req.body;
    const result=await AuthService.loginUserIntoAuth(data);
    const {accessToken,email}=result;
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Login Successfully',data:{accessToken,email}})

});

const  changePassword:RequestHandler=catchAsync(async(req,res)=>{

    const user=req.user;
    const result=await AuthService.changePassword(user,req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Login Successfully',data:result})
});

const contact_me_send_email:RequestHandler=catchAsync(async(req,res)=>{
   


    const result=await AuthService.contact_me_send_email(req.body.emaildata);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:'Mail Send Successfully',data:result})
});


export const  LoginUserController={
    loginUser,
    changePassword,
    contact_me_send_email
  
}