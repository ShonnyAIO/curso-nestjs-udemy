import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [CoursesModule], // Importar el modulo para trabajar con ellos
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
