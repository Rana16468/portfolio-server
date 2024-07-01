import { Types } from "mongoose";

export interface TProjectDetails{

    project:Types.ObjectId;
    projecttype:string;
    statingTime:string;
    enddingTime:string;
    feature:'Payment GetWay' | 'Account Types' 
    featureDiscription:string;
    responsiveDesign:string;
    technologiesUsed:string;
    src:string;
}