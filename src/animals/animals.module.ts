import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsResolver } from './animals.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { animalsSchema } from './schema/animals.schema';

@Module({
  providers: [AnimalsResolver, AnimalsService],
  imports: [
    MongooseModule.forFeature([{ name: 'animal', schema: animalsSchema }]),
  ],
  exports: [AnimalsService],
})
export class AnimalsModule {}
