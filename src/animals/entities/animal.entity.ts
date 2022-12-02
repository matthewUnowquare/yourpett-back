import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class Animal {
  @Field(() => ID, { description: 'Animal id' })
  @IsString()
  id: string;

  @Field(() => String, { description: 'animal name' })
  @IsString()
  name: string;

  @Field(() => String, { description: 'animal breed' })
  @IsString()
  breed: string;
}
