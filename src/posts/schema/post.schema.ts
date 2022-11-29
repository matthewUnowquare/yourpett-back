import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<post>;

@Schema()
export class post {
  @Prop({ required: true })
  petId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const postSchema = SchemaFactory.createForClass(post);
