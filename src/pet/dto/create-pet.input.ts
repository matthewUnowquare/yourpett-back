import { InputType, Field, Int, ID } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

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
  @IsString()
  specie: string;

  @Field(() => ID, { description: 'Here goes the owner of your pet' })
  @IsString()
  owner: string;

  @Field(() => String, { description: 'Here goes your pet breed' })
  @IsString()
  breed: string;

  @Field(() => String, { description: 'Here goes your pet genre' })
  @IsEnum({ M: 'M', F: 'F' })
  @IsOptional()
  genre?: 'M' | 'F';

  @Field(() => Int, { description: 'Here goes your pet age' })
  @Min(1)
  @IsInt()
  age: number;

  @Field(() => Boolean, {
    description: 'Here you can specify if it is currently alive',
  })
  @IsBoolean()
  alive: boolean;
}
