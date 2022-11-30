import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { user } from './schema/user.schema';
import { UsersService } from './users.service';
import { Chance } from 'chance';
import * as mongoose from 'mongoose';
import { UserDocument } from '../../dist/users/schema/user.schema';
import { createMock } from '@golevelup/ts-jest';

describe('userService', () => {
  let service: UsersService;
  const chance = new Chance();
  let mockUserModel: Model<UserDocument>;

  const mockUser = (
    name = chance.name(),
    email = chance.email(),
    password = chance.string(),
    avatar = chance.url(),
  ) => ({
    name,
    email,
    password,
    avatar,
  });

  const userId = new mongoose.Types.ObjectId();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(user.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            find: jest.fn(),
            create: jest.fn(),
            findById: jest.fn().mockReturnThis(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();
    mockUserModel = module.get<Model<UserDocument>>(getModelToken(user.name));
    service = module.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
  it('should find One', async () => {
    const spy = jest.spyOn(mockUserModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser()),
      where: jest.fn().mockReturnThis(),
      equals: jest.fn().mockReturnThis(),
    } as any);

    await service.findOne(userId.toString());
    expect(spy).toBeCalledWith(userId.toString());
  });

  it('should throw an error if id not exist', () => {
    jest.spyOn(mockUserModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
      where: jest.fn().mockReturnThis(),
      equals: jest.fn().mockReturnThis(),
    } as any);
    expect(service.findOne(userId.toString())).rejects.toThrow(
      'user not found',
    );
  });

  it('should find All', async () => {
    const spy = jest.spyOn(mockUserModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockUser()]),
      where: jest.fn().mockReturnThis(),
      equals: jest.fn().mockReturnThis(),
    } as any);

    await service.findAll();
    expect(spy).toBeCalled();
  });

  it('should create', async () => {
    const spy = jest
      .spyOn(mockUserModel, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockUser() as any));

    await service.create(mockUser());
    expect(spy).toBeCalled();
  });

  it('should update', async () => {
    const spy = jest.spyOn(mockUserModel, 'findById').mockReturnValueOnce(
      createMock<Query<UserDocument, UserDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          name: chance.name(),
          email: chance.email(),
          password: chance.string(),
          avatar: chance.url(),
        }),
      }) as any,
    );

    const user = await service.update(userId.toString(), {
      id: userId.toString(),
      ...mockUser(),
    });
    expect(spy).toBeCalled();
    expect(user).toBeDefined();
  });
  it('should remove', () => {
    const spy = jest.spyOn(mockUserModel, 'findById').mockReturnValueOnce(
      createMock<Query<UserDocument, UserDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          name: chance.name(),
          email: chance.email(),
          password: chance.string(),
          avatar: chance.url(),
          isActive: false,
        }),
      }),
    ) as any;
    service.remove(userId.toString());
    expect(spy).toBeCalledWith(userId.toString());
  });
});
