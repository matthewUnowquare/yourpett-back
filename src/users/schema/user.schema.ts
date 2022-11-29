import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] })
  friends: user[];
}

export const userSchema = SchemaFactory.createForClass(user);
