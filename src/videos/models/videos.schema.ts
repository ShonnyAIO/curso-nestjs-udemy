import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({timestamps: true})
export class Video {
    @Prop({ required: true})
    title : string;

    @Prop()
    description: string;

    @Prop()
    source: string;

    @Prop()
    score: number;

    @Prop()
    idCourse: mongoose.Types.ObjectId;
}

export const VideoSchema = SchemaFactory.createForClass(Video);