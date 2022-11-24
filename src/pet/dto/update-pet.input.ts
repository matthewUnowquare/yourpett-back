import { CreatePetInput } from './create-pet.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
  @Field(() => ID)
  @IsString()
  id: string;
}
