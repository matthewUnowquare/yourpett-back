import { CreateBreedInput } from './create-breed.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateBreedInput extends PartialType(CreateBreedInput) {
  @Field(() => ID)
  @IsString()
  id: string;
}
