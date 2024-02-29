import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { cityEntityMock } from '../__mock__/city.mock';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { CacheService } from '../../../modules/cache/cache.service';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockImplementation((_, callback) => callback()),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findBy: jest.fn().mockResolvedValue([cityEntityMock]),
            findOneBy: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(cityRepository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getCitiesByStateId', () => {
    it('should return all cities from the state', async () => {
      const cities = await service.getCitiesByStateId(cityEntityMock.stateId);
      expect(cities).toEqual([cityEntityMock]);
    });

    it('should return error if repo throws', () => {
      jest.spyOn(cityRepository, 'findBy').mockRejectedValueOnce(new Error());
      expect(
        service.getCitiesByStateId(cityEntityMock.stateId),
      ).rejects.toThrow();
    });
  });

  describe('getCityById', () => {
    it('should return city by id', async () => {
      const city = await service.getCityById(cityEntityMock.id);
      expect(city).toEqual(cityEntityMock);
    });

    it('should return error if repository return undefined', () => {
      jest.spyOn(cityRepository, 'findOneBy').mockResolvedValueOnce(undefined);
      expect(service.getCityById(cityEntityMock.id)).rejects.toThrow();
    });

    it('should return error if repo throws', () => {
      jest
        .spyOn(cityRepository, 'findOneBy')
        .mockRejectedValueOnce(new Error());
      expect(service.getCityById(cityEntityMock.id)).rejects.toThrow();
    });
  });
});
