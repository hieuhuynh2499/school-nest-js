import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.interface';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { StudentEntity } from '../models/student.entity';
import { StudentInterface } from '../models/student.interface';

@Injectable()
export class StudentService {
    // dj 
    constructor(
        @InjectRepository(StudentEntity)
        private StudentRepository: Repository<StudentEntity>
    ) {}

    // insert one entity in database 
    createPost(user: User,student:StudentInterface):Promise<InsertResult>{
        // this.StudentRepository.save(feedPost)
        // return feedPost
        student.teacher = user
        const studentNew = this.StudentRepository.insert(student)
        return studentNew
    }

    // select student by 
    async findOneStudent (id):Promise<StudentInterface>{
        return await this.StudentRepository.findOne(id)
    }

    async findAllStudents ():Promise<StudentInterface[]>{
        // const student =  this.StudentRepository.query(`select * from student`)
        // return student
        return await this.StudentRepository.find()
    }
    async findStudentSelected (page:number,limit:number):Promise<StudentInterface[]>{
        const student =  await this.StudentRepository.query(`select * from student offset ${page * limit - limit} limit ${limit}`)
        return student
    }

    async updateStudent(id:number,studentUp:StudentInterface):Promise<UpdateResult>{
        return await this.StudentRepository.update(id,studentUp)
    }

     async deleteStudent(id:number):Promise<DeleteResult>{
        return await this.StudentRepository.delete(id)
    }

}
