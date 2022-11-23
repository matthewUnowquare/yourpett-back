import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  @MinLength(6)
  password: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsUrl()
  avatar: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsEnum({ M: 'M', F: 'F' })
  @IsOptional()
  genre?: 'M' | 'F';
}
