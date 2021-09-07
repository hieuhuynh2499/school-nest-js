import { Injectable } from '@nestjs/common'
import { from, map, Observable, switchMap } from 'rxjs'
import * as bcrypt from 'bcrypt'
import { User } from '../models/user.interface'
import { UserEntity } from '../models/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity)
     private readonly userResponsitory:Repository<UserEntity>,
     private jwtService:JwtService
     ){}

    hashPassword(password: string) :Observable<string>{
        return from(bcrypt.hash(password,12))
    }
    registerAccount(user:User):Observable<User> {
        const {fullName, email,password} = user

        return this.hashPassword(password).pipe(
            switchMap((hashedPassword:string)=>{
                return from(
                     this.userResponsitory.save({
                         fullName,
                         email,
                         password:hashedPassword,
                     })
                ).pipe(
                    map((user:User)=>{
                        delete user.password
                        return user
                    })
                )
            })
        )
    }


    validateUser(email:string,password:string):Observable<User>{
        return from(this.userResponsitory.findOne({email},{select:[
            'id','fullName','email','password','role','students'
        ]})).pipe(
            switchMap((user:User)=> from(
                bcrypt.compare(password,user.password)
            ).pipe(
                map((isValidPassword:boolean)=>{
                    if(isValidPassword) {
                        delete user.password
                        return user
                    }
                })
            )
            )
        )
    }

    login(user:User):Observable<string>{
        const {email,password} = user
        return  this.validateUser(email,password).pipe(
            switchMap((user:User)=>{
                if(user){
                    return from(this.jwtService.signAsync({user}))
                }
            })
        )
    }
}
