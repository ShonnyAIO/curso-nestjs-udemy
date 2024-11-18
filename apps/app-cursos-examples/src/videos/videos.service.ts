import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoDocument, Video } from './models/videos.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
    private eventEmitter: EventEmitter2
  ) {}

  async create(createVideoDto: CreateVideoDto) {
    const video = await this.videoModel.create(createVideoDto);
    // this.eventEmitter.emit('video.create', video);
    const idUser = '62abcd';
    this.eventEmitter.emit('video_user.created', {id: idUser, video });
    return video;
  }

  findAll() {
    return this.videoModel.find({});
  }

  findOne(id: string) {
    return this.videoModel.findOne({ id });
  }

  update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.videoModel.findOneAndUpdate({ id }, updateVideoDto);
  }

  remove(id: string) {
    return this.videoModel.findOneAndDelete({ id });
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
