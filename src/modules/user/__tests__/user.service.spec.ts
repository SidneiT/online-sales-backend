import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import { userEntityMock } from '../__mock__/user.mock';
import { createUserMock } from '../__mock__/create-user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(userEntityMock),
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should throw error when user already exists', () => {
      expect(service.createUser(createUserMock)).rejects.toThrow();
    });

    it('should return user when email not exists', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const user = await service.createUser(createUserMock);

      expect(user).toEqual(userEntityMock);
    });
  });

  describe('getUserByEmail', () => {
    it('should return user ', async () => {
      const user = await service.getUserByEmail(userEntityMock.email);

      expect(user).toEqual(userEntityMock);
    });

    it('should throw error when user email is invalid', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrow();
    });

    it('should return error when repository throws', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockRejectedValueOnce(new Error());

      expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrow();
    });
  });

  describe('getUserById', () => {
    it('should return user ', async () => {
      const user = await service.getUserById(userEntityMock.id);

      expect(user).toEqual(userEntityMock);
    });

    it('should throw error when user id is invalid', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      expect(service.getUserById(userEntityMock.id)).rejects.toThrow();
    });

    it('should return error  when repository throws', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockRejectedValueOnce(new Error());

      expect(service.getUserById(userEntityMock.id)).rejects.toThrow();
    });
  });

  describe('getUserByIdWithRelations', () => {
    it('should return user in getUserByIdWithRelations', async () => {
      const user = await service.getUserByIdWithRelations(userEntityMock.id);

      expect(user).toEqual(userEntityMock);
    });
  });
});
