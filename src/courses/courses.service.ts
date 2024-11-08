import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './models/courses.schema';
import { User, UserDocument } from 'src/users/models/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private readonly courseModel:Model<CourseDocument>,
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>){}
  // Injectar los modelos de otros schemas que necesitamos iteractuar con ellos


  create(createCourseDto: CreateCourseDto) {
    // ERR Comunes: const user = this.userModel.find()
    return this.courseModel.create(createCourseDto)
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(title: string) {
    return this.courseModel.find({title: title});
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
