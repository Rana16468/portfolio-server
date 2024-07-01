import { TUser } from "./user.interfcae"
import { User } from "./user.modal";


const createUserIntoDb=async(payload:TUser)=>{

    

    
    const buildInUser= new User(payload);
    const result=await buildInUser.save();
    return result;
}

export const UserServices={
    createUserIntoDb
}