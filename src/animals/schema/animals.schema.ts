import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnimalsDocument = HydratedDocument<animal>;

@Schema()
export class animal {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  breed: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const animalsSchema = SchemaFactory.createForClass(animal);
