import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsEmail, IsString, IsUrl } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  avatar: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  genre: 'M' | 'F';
}
