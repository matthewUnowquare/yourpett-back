import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { post, PostDocument } from './schema/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(post.name) private postModel: Model<PostDocument>) {}
  create(createPostInput: CreatePostInput) {
    return this.postModel.create(createPostInput);
  }

  findAll() {
    return this.postModel.find().exec();
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const post = await this.findOne(id);
    post.title = updatePostInput.title;
    post.description = updatePostInput.description;
    post.save();
    return post;
  }

  async remove(id: string) {
    const post = await this.findOne(id);
    post.remove();
    return post;
  }
}
