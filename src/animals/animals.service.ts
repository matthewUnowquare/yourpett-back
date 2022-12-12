import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAnimalInput } from './dto/create-animal.input';
import { Model } from 'mongoose';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { animal, AnimalsDocument } from './schema/animals.schema';

@Injectable()
export class AnimalsService {
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(animal.name) private animalsModel: Model<AnimalsDocument>,
  ) {}
  create(createAnimalInput: CreateAnimalInput) {
    return this.animalsModel.create(createAnimalInput);
  }

  findAll() {
    return this.animalsModel.find().where('isActive').equals(true).exec();
  }

  async findOne(id: string, isActive = true) {
    const animal = await this.animalsModel
      .findById(id)
      .where('isActive')
      .equals(isActive)
      .exec();
    if (!animal) throw new NotFoundException('animal not found');

    return animal;
  }

  async update(id: string, UpdateAnimalInput: UpdateAnimalInput) {
    const animal = await this.findOne(id);

    animal.name = UpdateAnimalInput.name;
    animal.breed = UpdateAnimalInput.breed;

    animal.save();
    return animal;
  }

  async remove(id: string) {
    const animal = await this.findOne(id);
    animal.isActive = false;
    animal.save();
    return animal;
  }

  async recoverUser(id: string) {
    const animal = await this.findOne(id, false);
    animal.isActive = true;
    animal.save();
    return animal;
  }
}
