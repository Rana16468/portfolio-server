import httpStatus from "http-status";
import { User } from "../user/user.modal";
import { TLoginUser } from "./auth.interface";
import AppError from "../../error/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt';
import { sendEmail } from "../../utility/sendEmail";

const loginUserIntoAuth=async(payload:TLoginUser)=>{


    const isUserExist=await User.findOne({email:payload?.email});
    if(!isUserExist)
    {
        throw new AppError(httpStatus.NOT_FOUND,"This Email Not Exist in the Database","");
    }

    if(!await User.isPasswordMatched(payload.password,isUserExist.password))
    {
        throw new AppError(httpStatus.FORBIDDEN,'This Password Not Matched','')
    }

    const jwtPayload={
        email:isUserExist.email,
        id:isUserExist._id
    }
    const accessToken=jwt.sign(jwtPayload, config.jwt_access_srcret as string, { expiresIn: '10d' });
    

    return {
        accessToken,
        email:payload?.email,
       
    };

}

const changePassword= async(user:JwtPayload,payload:{
    oldPassword:string;
    newPassword:string;
})=>{

  

  const isUserExist=await User.findById(user.id);

  if(!isUserExist)
  {
      throw new AppError(httpStatus.NOT_FOUND,'This User is Not Founded','')
  }

  if(!await User.isPasswordMatched(payload.oldPassword,isUserExist.password))
  {
      throw new AppError(httpStatus.FORBIDDEN,'This Password Not Matched','')
  }
  // hash new Password 
    const newHashedPassword=await bcrypt.hash(payload.newPassword,Number(config.byrypt_salt_rounds));
   
   const result=  await User.findOneAndUpdate({_id:user.id},{
        password:newHashedPassword  
       
       
    });


    return result


}

const contact_me_send_email=async(data:string)=>{
   

    //const resetUILink=`${config.reset_pass_ui_link}?id=${isUserExist.id}&token=${resetToken}`;
    sendEmail(config.user_email_address as string, data);
    return "Mail Send Successfully"
}



export const AuthService={
    loginUserIntoAuth,
    changePassword,
    contact_me_send_email

}