import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { user, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(user.name) private userModel: Model<UserDocument>) {}
  create(createUserInput: CreateUserInput) {
    return this.userModel.create(createUserInput);
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);

    user.name = updateUserInput.name;
    user.email = updateUserInput.email;
    user.avatar = updateUserInput.avatar;

    (await user).save();
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    (await user).remove();
    return { user };
  }
}
