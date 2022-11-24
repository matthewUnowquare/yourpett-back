import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { petSchema } from './schema/pet.schema';

@Module({
  providers: [PetResolver, PetService],
  imports: [MongooseModule.forFeature([{ name: 'pet', schema: petSchema }])],
})
export class PetModule {}
