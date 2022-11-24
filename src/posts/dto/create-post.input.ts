import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  petId: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  title: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  description: string;
}
