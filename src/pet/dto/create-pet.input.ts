import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

@InputType()
export class CreatePetInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsUrl()
  photo: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  specie: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  race: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsEnum({ M: 'M', F: 'F' })
  @IsOptional()
  genre?: 'M' | 'F';

  @Field(() => String, { description: 'Example field (placeholder)' })
  age: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  alive: boolean;
}
