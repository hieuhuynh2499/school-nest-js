import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Request, Res, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { throws } from 'assert';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ValidationPipe } from 'src/pipes/student.pipes';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { StudentInterface } from '../models/student.interface';
import { StudentService } from '../services/student.service';

@Controller('student')
export class StudentController {

    // dj
    constructor(private studentService:StudentService){}


    // method create new student 
    @UseGuards(JwtGuard)
    @Post()
    async create(
        @Body() student:StudentInterface,@Request() req
        ) :Promise<InsertResult>{
        if(student.name.match(/^\d/)) {
            throw new HttpException('name is not start with number', HttpStatus.NOT_ACCEPTABLE);
        }
        else if(student.name.length <= 6){
            throw new HttpException('name have to length > 6', HttpStatus.NOT_ACCEPTABLE);
        }
        else{
            const newStudent  = await this.studentService.createPost(req.user,student)
            return newStudent.raw[0]
        }
    }   

    
    // pagination students
    @Get()
    async findSelected(
        @Query('page') page:number = 1,
        @Query('limit') limit:number = 1
    ):Promise<StudentInterface[]>{
        return await this.studentService.findStudentSelected(page, limit)
    }
    // get all student
    @Get('all')
    findAll():Promise<StudentInterface[]>{
        const allStudent = this.studentService.findAllStudents()
        return allStudent
    }

    // method get detail student
    @Get('/:id')
    findStudent(
        @Param('id',new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id:number
    ):Promise<StudentInterface>{
        return this.studentService.findOneStudent(id)
    }

    // method upadte student
     @Put('/:id')
    updatePost(
        @Param('id') id:number,
        @Body() feedPost:StudentInterface, 
    ):Promise<UpdateResult>{
        return this.studentService.updateStudent(id, feedPost)
    }
    // method delete student
    @Delete('/:id')
    delelePost(
        @Param('id',new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id:number,
    ):Promise<DeleteResult>{
        return this.studentService.deleteStudent(id)
    }
}
