import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsEmail, IsString, IsUrl } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'User id' })
  id: string;

  @Field(() => String, { description: 'user name' })
  name: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'avatar of the user' })
  avatar: string;

  @Field(() => String, { description: 'genre of the user' })
  genre: 'M' | 'F';
}
