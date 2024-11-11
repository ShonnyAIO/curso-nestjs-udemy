import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type VideoDocument = Video & Document;

@Schema({timestamps: true})
export class Video {

    @Prop({ unique: true, default : uuidv4 })
    id: string;

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