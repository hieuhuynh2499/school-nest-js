import { User } from "src/auth/models/user.interface";

export interface StudentInterface {
    id?:number;
    name?:string;
    age?:number;
    createAt?:Date;  
    teacher?:User;
}