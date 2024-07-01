import { Model } from "mongoose";


export type TUser={

    _id?:string
     username:string;
     email:string;
     password :string;
    
 }

 export interface UserModel extends Model<TUser> {
    // eslint-disable-next-line no-unused-vars
    isUserExistByCustomname(username:string):Promise<TUser>,
     
     // eslint-disable-next-line no-unused-vars
     isPasswordMatched(plainTextPassword:string,hashPassword:string):Promise<boolean>,
     // eslint-disable-next-line no-unused-vars
     isUserExistByPortfolio(id:string):Promise<TUser>
  
  }

  