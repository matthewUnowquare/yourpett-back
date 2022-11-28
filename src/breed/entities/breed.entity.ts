import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Breed {
  @Field(() => String, { description: 'Breed name' })
  exampleField: string;

  @Field(() => String, { description: 'Animal breed' })
  animal: string;
}
