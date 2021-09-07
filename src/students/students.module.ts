import { MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { StudentService } from './services/student.service';
import { StudentController } from './controller/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './models/student.entity';
import { LoggerMiddleware, ShowMiddleware } from './middleware/student.middleware';


@Module({
  imports:[TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware,ShowMiddleware)
      .exclude(
        { path: '', method: RequestMethod.GET },
        { path: '', method: RequestMethod.POST },
      )
      .forRoutes(StudentController);
  }
}
