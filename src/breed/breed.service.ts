import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBreedInput } from './dto/create-breed.input';
import { UpdateBreedInput } from './dto/update-breed.input';
import { breed, BreedDocument } from './schema/breed.schema';

@Injectable()
export class BreedService {
  constructor(
    @InjectModel(breed.name) private breedModel: Model<BreedDocument>,
  ) {}
  create(createBreedInput: CreateBreedInput) {
    return this.breedModel.create(createBreedInput);
  }

  findAll() {
    return this.breedModel.find().exec();
  }

  async findOne(id: string) {
    const breed = await this.breedModel.findById(id).exec();
    if (!breed) throw new NotFoundException('user not found');

    return breed;
  }

  async update(id: string, updateBreedInput: UpdateBreedInput) {
    const breed = await this.findOne(id);

    breed.name = updateBreedInput.name;
    breed.animal = updateBreedInput.animal;

    (await breed).save();
    return breed;
  }

  async remove(id: string) {
    const breed = await this.findOne(id);
    (await breed).remove();
    return breed;
  }
}
