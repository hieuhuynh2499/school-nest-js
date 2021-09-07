// import { StudentEntity } from "src/students/models/student.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class TeacherEntity {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @Column()
    address:string;

    // @OneToMany(()=>StudentEntity,(studentEntity)=> studentEntity)
    // students:StudentEntity;
}