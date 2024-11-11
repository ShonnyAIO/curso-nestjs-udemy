import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/roles/roles.guard';
import { Rol } from 'src/decorators/rol/rol.decorator';
import { SlugPipe } from './slug/slug.pipe';

@ApiTags('courses')
@Controller('courses') //TODO http://localhost:3000/v1/courses
@UseGuards(JwtGuardGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @ApiBearerAuth()
  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Req() req:Request, @Body() create: CreateCourseDto) {
    return this.coursesService.create(create);
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(200)
  @Rol(['admin', 'user', 'manager'])
  getListCourses(){
    return this.coursesService.findAll();
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @Rol(['admin', 'user', 'manager'])
  deleteCourse(@Param('id') id: string){
    return this.coursesService.remove(id);
  }

  /*
  @ApiBearerAuth()
  @Get(':title')
  @Rol(['admin', 'user', 'manager'])
  getDetail(@Req() req:Request, @Param('title', new SlugPipe()) title:string) { // TODO el mejor libro del mundo
    title = req.params.title;
    return this.coursesService.findOneByTitle(title);
  } */

  @ApiBearerAuth()
  @Get(':id')
  @Rol(['admin', 'user', 'manager'])
  @HttpCode(200)
  getCourseDetail(@Param('id') id:string) {
    return this.coursesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Rol(['admin'])
  @HttpCode(200)
  updateCourse(@Param('id') id:string, @Body() body: CreateCourseDto){
    return this.coursesService.update(id, body);
  }
}
