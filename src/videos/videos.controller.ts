import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/utils/logger/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/media.handler';
import { CoursesService } from 'src/courses/courses.service';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Rol } from 'src/decorators/rol/rol.decorator';

@ApiTags('videos')
@UseGuards(JwtGuardGuard, RolesGuard)
@UseInterceptors(LoggerInterceptor)
@Controller('videos') // TODO localhost:3000/videos
// @UsePipes(new ValidationPipe())
export class VideosController {
  constructor(private readonly videosService: VideosService, private readonly courseService: CoursesService) {}
  // Injectamos el servicio que necesitamos consultar

  @Post() // TODO POST http://localhost:3000/videos
  @Rol(['admin'])
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto);
    return this.videosService.create(createVideoDto);
  }

  @Post('upload/:id') // TODO POST http://localhost:3000/v1/videos/upload
  @Rol(['admin'])
  @UseInterceptors(FileInterceptor('file', { storage: storage}))
  handleUpload(@Param('id') id:string, @UploadedFile() file: Express.Multer.File){
    return this.videosService.addVideo(id, file.filename);
  }

  @Get() // TODO GET http://localhost:3000/videos?id=1&description=holamundo
  @Rol(['admin', 'user', 'manager'])
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id') // TODO GET http://localhost:3000/videos/123213
  @Rol(['admin', 'user', 'manager'])
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  @Rol(['admin'])
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @Rol(['admin'])
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
