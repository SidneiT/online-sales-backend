import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { addressEntityMock } from '../__mock__/address.mock';
import { UserService } from '../../../modules/user/user.service';
import { CityService } from '../../../modules/city/city.service';
import { userEntityMock } from '../../../modules/user/__mock__/user.mock';
import { createAddressMock } from '../__mock__/create-address.mock';

describe('StateService', () => {
  let service: AddressService;
  let userService: UserService;
  let cityService: CityService;
  let addressRepository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressEntityMock),
            find: jest.fn().mockResolvedValue([addressEntityMock]),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            getCityById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(addressRepository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getByUser', () => {
    it('should return all addresses from user', async () => {
      const address = await service.getByUser(addressEntityMock.id);
      expect(address).toEqual([addressEntityMock]);
    });

    it('should return error if repo throws', () => {
      jest.spyOn(addressRepository, 'find').mockRejectedValueOnce(new Error());
      expect(service.getByUser(addressEntityMock.id)).rejects.toThrow();
    });

    it('should throw not found if user does not have addresses', () => {
      jest.spyOn(addressRepository, 'find').mockResolvedValueOnce(undefined);
      expect(service.getByUser(addressEntityMock.id)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should return all addresses from user', async () => {
      const address = await service.create(
        createAddressMock,
        addressEntityMock.id,
      );
      expect(address).toEqual(addressEntityMock);
    });

    it('should return error if user does not exist', () => {
      jest.spyOn(userService, 'getUserById').mockRejectedValueOnce(new Error());
      expect(
        service.create(createAddressMock, addressEntityMock.id),
      ).rejects.toThrow();
    });

    it('should return error if city does not exist', () => {
      jest.spyOn(cityService, 'getCityById').mockRejectedValueOnce(new Error());
      expect(
        service.create(createAddressMock, addressEntityMock.id),
      ).rejects.toThrow();
    });

    it('should return error if repo throws', () => {
      jest.spyOn(addressRepository, 'save').mockRejectedValueOnce(new Error());
      expect(
        service.create(createAddressMock, addressEntityMock.id),
      ).rejects.toThrow();
    });
  });
});
