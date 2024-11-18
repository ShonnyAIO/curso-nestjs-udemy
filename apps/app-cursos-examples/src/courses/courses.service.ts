import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './models/courses.schema';
import { User, UserDocument } from '../users/models/users.schema';
import { Model, Types } from 'mongoose';

interface ModelExt<T> extends Model<T> {
  delete: (data: {_id : Types.ObjectId}) => void;
  paginate: (query: any, pagination: any) => void;
  // findAllCourses: Function;
}

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: ModelExt<CourseDocument>,
    @InjectModel(User.name) private readonly userModel: ModelExt<UserDocument>,
  ) {}
  // Injectar los modelos de otros schemas que necesitamos iteractuar con ellos

  create(createCourseDto: CreateCourseDto) {
    // ERR Comunes: const user = this.userModel.find()
    return this.courseModel.create(createCourseDto);
  }

  async findAll(pagination: any) {
    /*
    // TODO Estamos trabajando en la collection de COURSES
    const list = this.courseModel.aggregate([
      {
        $lookup : {
          from : 'users', // TODO
          // foreignField : 'id',
          // localField : 'idAuthor',
          let : { idAuthor : "$idAuthor"} ,
          pipeline : [ // TODO estoy actuando sobre la collection de users
            {
              $match : {
                $expr: { $eq: ["$$idAuthor", "$id"] },
              }
            },
            {
              $project : {
                _id : 0,
                name : 1,
                email : 1
              }
            }
          ],
          as : 'author',
        }
      },
      {
        $unwind : '$author'
      }
    ]); */
    // return this.courseModel.findAllCourses({});
    return this.courseModel.paginate({}, pagination);
  }

  findOne(id: string) {
    return this.courseModel.find({ id });
  }

  findOneByTitle(title: string) {
    return this.courseModel.find({ title });
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findOneAndUpdate({ id }, updateCourseDto);
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const response = this.courseModel.delete({ _id });
    return response;
  }
}
