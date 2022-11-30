import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { PetDocument, pet } from './schema/pet.schema';

@Injectable()
export class PetService {
  constructor(@InjectModel(pet.name) private petModel: Model<PetDocument>) {}
  create(createPetInput: CreatePetInput) {
    return this.petModel.create(createPetInput);
  }

  findAll() {
    return this.petModel.find().exec();
  }

  async findOne(id: string) {
    const pet = await this.petModel.findById(id).exec();
    if (!pet) throw new NotFoundException('user not found');

    return pet;
  }

  async update(id: string, updatePetInput: UpdatePetInput) {
    const pet = await this.findOne(id);

    pet.name = updatePetInput.name;
    pet.photo = updatePetInput.photo;
    pet.specie = updatePetInput.specie;
    pet.breed = updatePetInput.breed;
    pet.genre = updatePetInput.genre;
    pet.age = updatePetInput.age;
    pet.alive = updatePetInput.alive;

    pet.save();
    return pet;
  }

  async remove(id: string) {
    const pet = await this.findOne(id);
    pet.remove();
    return pet;
  }
}
