import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID, { description: 'Here goes your post id' })
  id: string;

  @Field(() => String, { description: 'Here goes your pet Id' })
  petId: string;

  @Field(() => String, { description: 'Here goes your post title' })
  title: string;

  @Field(() => String, { description: 'Here goes your post description' })
  description: string;
}
