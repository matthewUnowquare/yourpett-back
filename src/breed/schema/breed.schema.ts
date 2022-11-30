import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BreedDocument = HydratedDocument<breed>;

@Schema()
export class breed {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  animal: string;
}

export const breedSchema = SchemaFactory.createForClass(breed);
