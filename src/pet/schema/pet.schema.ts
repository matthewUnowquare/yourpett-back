import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PetDocument = HydratedDocument<pet>;

@Schema()
export class pet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  photo: string;

  @Prop({ required: true, minlength: 6 })
  specie: string;

  @Prop({ required: true })
  race: string;

  @Prop({ default: 'M' })
  genre: 'M' | 'F';

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  alive: boolean;
}

export const petSchema = SchemaFactory.createForClass(pet);
