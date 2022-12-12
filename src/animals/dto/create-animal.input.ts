import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateAnimalInput {
  @Field(() => String, { description: 'Create an animal (placeholder)' })
  @IsString()
  name: string;

  @Field(() => String, { description: 'describe anima breed (placeholder)' })
  @IsString()
  breed: string;
}
