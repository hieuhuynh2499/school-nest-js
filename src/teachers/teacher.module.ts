import { Module } from '@nestjs/common';
import { TeacherController } from './controller/teacher.controller';
import { TeacherService } from './services/teacher.service';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
