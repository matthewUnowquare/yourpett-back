import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsService } from './animals.service';
import { Model, Query } from 'mongoose';
import { animal } from './schema/animals.schema';
import { Chance } from 'chance';
import * as mongoose from 'mongoose';
import { AnimalsDocument } from '../../dist/animals/schema/animals.schema';
import { createMock } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';

describe('AnimalsService', () => {
  let service: AnimalsService;
  const chance = new Chance();
  let mockAnimalModel: Model<AnimalsDocument>;

  const mockAnimal = (name = chance.name(), breed = chance.animal()) => ({
    name,
    breed,
  });

  const animalId = new mongoose.Types.ObjectId();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsService,
        {
          provide: getModelToken(animal.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockAnimal()),
            constructor: jest.fn().mockResolvedValue(mockAnimal()),
            find: jest.fn(),
            create: jest.fn(),
            findById: jest.fn().mockReturnThis(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    mockAnimalModel = module.get<Model<AnimalsDocument>>(
      getModelToken(animal.name),
    );
    service = module.get<AnimalsService>(AnimalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find One', async () => {
    const spy = jest.spyOn(mockAnimalModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockAnimal()),
      where: jest.fn().mockReturnThis(),
      equals: jest.fn().mockReturnThis(),
    } as any);

    await service.findOne(animalId.toString());
    expect(spy).toBeCalledWith(animalId.toString());
  });

  it('should throw an error if id not exist', () => {
    jest.spyOn(mockAnimalModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
      where: jest.fn().mockReturnThis(),
      equals: jest.fn().mockReturnThis(),
    } as any);
    expect(service.findOne(animalId.toString())).rejects.toThrow(
      'user not found',
    );
  });

  it('should find All', async () => {
    const spy = jest.spyOn(mockAnimalModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockAnimal()]),
      where: jest.fn().mockReturnThis(),
      equals: jest.fn().mockReturnThis(),
    } as any);

    await service.findAll();
    expect(spy).toBeCalled();
  });

  it('should create', async () => {
    const spy = jest
      .spyOn(mockAnimalModel, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockAnimal() as any));

    await service.create(mockAnimal());
    expect(spy).toBeCalled();
  });

  it('should update', async () => {
    const spy = jest.spyOn(mockAnimalModel, 'findById').mockReturnValueOnce(
      createMock<Query<AnimalsDocument, AnimalsDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          name: chance.name(),
          email: chance.email(),
          password: chance.string(),
          avatar: chance.url(),
        }),
      }) as any,
    );

    const user = await service.update(animalId.toString(), {
      id: animalId.toString(),
      ...mockAnimal(),
    });
    expect(spy).toBeCalled();
    expect(user).toBeDefined();
  });
  it('should remove', () => {
    const spy = jest.spyOn(mockAnimalModel, 'findById').mockReturnValueOnce(
      createMock<Query<AnimalsDocument, AnimalsDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          name: chance.name(),
          email: chance.email(),
          password: chance.string(),
          avatar: chance.url(),
          isActive: false,
        }),
      }),
    ) as any;
    service.remove(animalId.toString());
    expect(spy).toBeCalledWith(animalId.toString());
  });
});
