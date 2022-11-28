import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'Pet Id' })
  @IsString()
  petId: string;

  @Field(() => String, { description: 'title' })
  @IsString()
  title: string;

  @Field(() => String, { description: 'description' })
  @IsString()
  description: string;
}
