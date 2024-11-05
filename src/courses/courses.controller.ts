import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SlugPipe } from './slug/slug.pipe';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { Request } from 'express';

@ApiTags('courses')
@Controller('courses') //TODO http://localhost:3000/v1/courses
@UseGuards(JwtGuardGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @ApiBearerAuth()
  @Post()
  @HttpCode(201)
  create(@Req() req:Request, @Body() create: CreateCourseDto) {
    console.log(req.user);
    return this.coursesService.create(create);
  }

  @ApiBearerAuth()
  @Get(':title')
  getDetail(@Req() req:Request, @Param('title', new SlugPipe()) title:string) { // TODO el mejor libro del mundo
    // TODO el-mejor-libro-del-mundo
    console.log(req.user);
    return this.coursesService.findOne(1);
  }
}
