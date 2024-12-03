import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
