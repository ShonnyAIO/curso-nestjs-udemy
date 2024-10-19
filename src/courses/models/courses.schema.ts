import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({timestamps: true})
export class Course {
    @Prop({ required: true })
    title: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    // @Prop()
    // idAuthor: mongoose.Types.ObjectId;

    @Prop()
    cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);