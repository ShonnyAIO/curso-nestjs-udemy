import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoDocument, Video } from './models/videos.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VideosService {

  constructor(@InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>){}

  create(createVideoDto: CreateVideoDto) {
    return this.videoModel.create(createVideoDto);
  }

  findAll() {
    return this.videoModel.find({});
  }

  findOne(id: number) {
    return this.videoModel.findOne({id});
  }

  update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.videoModel.findOneAndUpdate({id}, updateVideoDto);
  }

  remove(id: string) {
    return this.videoModel.findOneAndDelete({id});
  }

  addVideo(id: string, filename: string) {
    return this.videoModel.findOneAndUpdate(
      { id },
      { source: filename },
      {
        new: true,
        upsert: true,
      },
    );
  }
}
