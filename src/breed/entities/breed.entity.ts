import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Breed {
  @Field(() => ID, { description: 'ID (placeholder)' })
  id: string;
  @Field(() => String, { description: 'Animal breed' })
  animal: string;
}
