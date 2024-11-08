import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, ParseIntPipe, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SlugPipe } from './slug/slug.pipe';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/roles/roles.guard';
import { Rol } from 'src/decorators/rol/rol.decorator';

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
  @Rol(['admin'])
  @Get(':title')
  getDetail(@Req() req:Request, @Param('title', new SlugPipe()) title:string) { // TODO el mejor libro del mundo
    // TODO el-mejor-libro-del-mundo
    title = req.params.title;
    return this.coursesService.findOne(title);
  }
}
