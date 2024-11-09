import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './models/courses.schema';
import { User, UserDocument } from 'src/users/models/users.schema';
import { Model, Types } from 'mongoose';

interface ModelExt<T> extends Model<T> {
  delete:Function
}


@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private readonly courseModel:ModelExt<CourseDocument>,
  @InjectModel(User.name) private readonly userModel: ModelExt<UserDocument>){}
  // Injectar los modelos de otros schemas que necesitamos iteractuar con ellos


  create(createCourseDto: CreateCourseDto) {
    // ERR Comunes: const user = this.userModel.find()
    return this.courseModel.create(createCourseDto)
  }

  findAll() {
    return this.courseModel.find({});
  }

  findOne(title: string) {
    return this.courseModel.find({title: title});
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const response = this.courseModel.delete({_id});
    return response;
  }
}
