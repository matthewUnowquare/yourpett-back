import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedResolver } from './breed.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { breedSchema } from './schema/breed.schema';

@Module({
  providers: [BreedResolver, BreedService],
  imports: [
    MongooseModule.forFeature([{ name: 'breed', schema: breedSchema }]),
  ],
})
export class BreedModule {}
