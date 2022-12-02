import { CreateAnimalInput } from './create-animal.input';
import { InputType, Field, PartialType, Int, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateAnimalInput extends PartialType(CreateAnimalInput) {
  @Field(() => ID)
  @IsString()
  id: string;
}
