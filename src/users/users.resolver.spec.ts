import { Test, TestingModule } from '@nestjs/testing';
import { Chance } from 'chance';
import { CreateUserInput } from './dto/create-user.input';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import * as mongoose from 'mongoose';

fdescribe('Users Resolvers', () => {
  let resolver: UsersResolver;
  const chance = new Chance();
  const createUserInput: CreateUserInput = {
    name: chance.name(),
    email: chance.email(),
    password: chance.string(),
    avatar: chance.url(),
  };
  const userId = new mongoose.Types.ObjectId();
  const userServiceMock = {
    create: jest.fn().mockResolvedValue({ _id: userId, ...createUserInput }),
    findOne: jest.fn().mockResolvedValue({ _id: userId, ...createUserInput }),
    findAll: jest.fn().mockResolvedValue([{ _id: userId, ...createUserInput }]),
    update: jest.fn().mockResolvedValue({ _id: userId, ...createUserInput }),
    remove: jest.fn().mockResolvedValue({ _id: userId, ...createUserInput }),
    recoverUser: jest
      .fn()
      .mockResolvedValue({ _id: userId, ...createUserInput }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query for a single post', async () => {
    const result = await resolver.findOne('1');
    expect(result).toEqual({
      _id: userId,
      ...createUserInput,
    });
  });

  it('should query for a list of posts', async () => {
    const result = await resolver.findAll();
    expect(result).toEqual([
      {
        _id: userId,
        ...createUserInput,
      },
    ]);
  });

  it('should create an user', async () => {
    const result = await resolver.createUser(createUserInput);
    expect(result).toEqual({
      _id: userId,
      ...createUserInput,
    });
  });
  it('should update an user', async () => {
    const result = await resolver.updateUser({
      id: userId.toString(),
      ...createUserInput,
    });
    expect(result).toEqual({
      _id: userId,
      ...createUserInput,
    });
  });
  it('should remove an user', async () => {
    const result = await resolver.removeUser(userId.toString());
    expect(result).toEqual({
      _id: userId,
      ...createUserInput,
    });
  });
  it('should recover an user', async () => {
    const result = await resolver.recoverUser(userId.toString());
    expect(result).toEqual({
      _id: userId,
      ...createUserInput,
    });
  });
});
