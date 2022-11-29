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
    return this.userModel.find().where('isActive').equals(true).exec();
  }

  async findOne(id: string, isActive = true) {
    const user = await this.userModel
      .findById(id)
      .where('isActive')
      .equals(isActive)
      .exec();
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);

    user.name = updateUserInput.name;
    user.email = updateUserInput.email;
    user.avatar = updateUserInput.avatar;

    user.save();
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.isActive = false;
    user.save();
    return user;
  }

  async recoverUser(id: string) {
    const user = await this.findOne(id, false);
    user.isActive = true;
    user.save();
    return user;
  }
}
