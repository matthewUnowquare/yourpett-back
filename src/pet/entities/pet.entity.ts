import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Pet {
  @Field(() => ID, { description: 'Here goes your pet ID' })
  id: string;

  @Field(() => String, { description: 'Here goes the name of your pet' })
  name: string;

  @Field(() => String, {
    description: 'Here goes the profile picture of your pet',
  })
  photo: URL;

  @Field(() => String, { description: 'Here goes your pet type of specie' })
  specie: string;

  @Field(() => String, { description: 'Here goes your pet breed' })
  breed: string;

  @Field(() => String, { description: 'Here goes your pet genre)' })
  genre: 'M' | 'F';

  @Field(() => Int, { description: 'Here goes your pet age' })
  age: number;

  @Field(() => Boolean, {
    description: 'Here you can specify if it is currently alive',
  })
  alive: boolean;
}
