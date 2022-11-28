import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateBreedInput {
  @Field(() => String, { description: 'Breed name' })
  @IsString()
  name: string;

  @Field(() => String, { description: 'Animal breed' })
  @IsString()
  animal: string;
}
