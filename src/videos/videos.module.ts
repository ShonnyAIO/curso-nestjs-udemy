import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CoursesModule } from 'src/courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './models/videos.schema';

@Module({
  imports: [CoursesModule, MongooseModule.forFeature([
    {
      name : Video.name,
      schema: VideoSchema
    }
  ])], // Importar el modulo para trabajar con ellos
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
