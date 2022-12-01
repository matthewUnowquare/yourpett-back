import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<user>;

@Schema()
export class user {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ default: 'M' })
  genre: 'M' | 'F';

  @Prop({ default: true })
  isActive: boolean;
}

export const userSchema = SchemaFactory.createForClass(user);
userSchema.virtual('pets', {
  ref: 'Pet',
  localField: '_id',
  foreignField: 'owner',
});
