import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema, Course } from './models/courses.schema';
import { UserSchema, User } from 'src/users/models/users.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Course.name, schema: CourseSchema },
    { name: User.name, schema: UserSchema}
  ])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService] // Para poder exportar el servicio y usarlo en otros modulos
})
export class CoursesModule { }
