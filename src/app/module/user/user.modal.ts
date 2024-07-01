import  { Schema, model } from "mongoose";

import  bcrypt from 'bcrypt';
import config from "../../config";
import { TUser, UserModel } from "./user.interfcae";




const TUserSchema= new Schema<TUser,UserModel>({
    username:{
        type:String,
        unique:true,
        required:[true,'user name is Required']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'email is Required']
    },
    password:{
        type:String,
        required:[true,'password is Required'],
      
    }
},{
    timestamps:true
});

// middlewere 

TUserSchema.pre('save', async function(next){

// hasing pawword sand save into db
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user=this;
    
    user.password=await bcrypt.hash(user.password,Number(config.byrypt_salt_rounds));
    next();

});
TUserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.password;
      delete ret.id
      return ret;
    },
  });


  // static method is username exits or not
  TUserSchema.statics.isUserExistByCustomname=async function(username:string)
  {

    return await User.findOne({username});
  }
  // static method is userId exist or not 
  // is password metch
  TUserSchema.statics.isPasswordMatched=async function(plainTextPassword:string,hashPassword:string)
  {
    
    const isPasswordMatch=await bcrypt.compare(plainTextPassword,hashPassword);
    return isPasswordMatch;
  }
  TUserSchema.statics.isUserExistByPortfolio=async(id:string)=>{

    const isUserExist=await User.findById(id);
    return isUserExist
  }

export const User=model<TUser,UserModel>('User',TUserSchema);