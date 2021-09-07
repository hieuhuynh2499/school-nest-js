import { StudentEntity } from "src/students/models/student.entity";
import { Entity, PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Role } from "./role.enum";


@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fullName:string;


    @Column()
    email:string;

    @Column({select:false})
    password:string;

    @Column({type:'enum',enum:Role,default:Role.USER})
    role:Role;
    

    @OneToMany(()=>StudentEntity,(studentEntity)=>studentEntity.teacher)
    students:StudentEntity[];
}