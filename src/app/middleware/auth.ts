import { NextFunction, Request, Response } from "express";

import catchAsync from "../utility/catchAsync";
import httpStatus from "http-status";

import config from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from "../error/AppError";


const auth=()=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

        const token=req.headers.authorization;

        if(!token)
        {
            throw new AppError(httpStatus.UNAUTHORIZED,'You are not Authorized','')
        }
        const decoded = jwt.verify(token, config.jwt_access_srcret as string) as JwtPayload;
    
        req.user=decoded as JwtPayload

        next();

    })


}

export default auth;