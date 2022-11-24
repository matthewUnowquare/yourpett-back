import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUrl, Min } from 'class-validator';

@InputType()
export class CreatePetInput {
  @Field(() => String, { description: 'Here goes the name of your pet' })
  @IsString()
  name: string;

  @Field(() => String, {
    description: 'Here goes the profile picture of your pet',
  })
  @IsUrl()
  photo: URL;

  @Field(() => String, { description: 'Here goes your pet type of specie' })
  specie: string;

  @Field(() => String, { description: 'Here goes your pet breed' })
  breed: string;

  @Field(() => String, { description: 'Here goes your pet genre' })
  @IsEnum({ M: 'M', F: 'F' })
  @IsOptional()
  genre?: 'M' | 'F';

  @Field(() => String, { description: 'Here goes your pet age' })
  @Min(1)
  age: number;

  @Field(() => String, {
    description: 'Here you can specify if it is currently alive',
  })
  alive: boolean;
}
