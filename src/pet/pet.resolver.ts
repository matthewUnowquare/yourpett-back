import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Resolver(() => Pet)
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return this.petService.create(createPetInput);
  }

  @Query(() => [Pet], { name: 'allPets' })
  findAll() {
    return this.petService.findAll();
  }

  @Query(() => Pet, { name: 'pet' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.petService.findOne(id);
  }

  @Mutation(() => Pet)
  updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput) {
    return this.petService.update(updatePetInput.id, updatePetInput);
  }

  @Mutation(() => Pet)
  removePet(@Args('id', { type: () => String }) id: string) {
    return this.petService.remove(id);
  }
}
