import { TeacherEntity } from 'src/teachers/models/teacher.entity';
import {Column,CreateDateColumn,Entity,ManyToOne,PrimaryGeneratedColumn} from 'typeorm'

@Entity('student')
export class StudentEntity{
    @PrimaryGeneratedColumn()
    id:number;


    @Column({default:''})
    name:string;

    @Column({default:20})
    age:number;


    @CreateDateColumn()
    createAt:Date;

    // @ManyToOne(() => TeacherEntity, (teacherEntity) => teacherEntity.students)
    // author:TeacherEntity;

}