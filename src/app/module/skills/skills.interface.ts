// id: 1,
// src: html,
// title: "HTML",
// style: "shadow-orange-500",

export interface TSkills{

    id:string;
    src:string;
    title:string;
    style:'shadow-orange-500' | 'shadow-blue-500' | 'shadow-yellow-500' | 'shadow-sky-400' | 'shadow-gray-400'
    isDeleted?:boolean;

}
