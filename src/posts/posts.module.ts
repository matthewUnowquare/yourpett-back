import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './schema/post.schema';

@Module({
  providers: [PostsResolver, PostsService],
  imports: [MongooseModule.forFeature([{ name: 'post', schema: postSchema }])],
})
export class PostsModule {}
