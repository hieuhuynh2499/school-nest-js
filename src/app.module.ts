import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { TeacherModule } from './teachers/teacher.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.POSTGRES_HOST,
      port:parseInt(process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      database:process.env.POSTGRES_DATABASE,
      autoLoadEntities:true,
      synchronize:true,
    }),
    StudentsModule,
    TeacherModule,
  ],
})
export class AppModule {}
