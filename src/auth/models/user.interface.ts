import { StudentInterface } from "src/students/models/student.interface";
import { Role } from "./role.enum";


export interface User{
    id?:number;
    fullName?:string;
    email?:string;
    password?:string;
    role?:Role;
    students?: StudentInterface[]
}