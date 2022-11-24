import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Pet {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  photo: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  specie: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  race: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  genre: 'M' | 'F';

  @Field(() => String, { description: 'Example field (placeholder)' })
  age: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  alive: boolean;
}
