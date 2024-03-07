import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

import { CacheService } from '../cache.service';

describe('StateService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue('cached-value'),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cacheManager).toBeDefined();
  });

  describe('getCache', () => {
    it('should return value from cache', async () => {
      const cacheValue = await service.getCache<string>('unit.test', () =>
        Promise.resolve('not-cached-value'),
      );

      expect(cacheManager.set).not.toHaveBeenCalled();
      expect(cacheManager.get).toHaveBeenCalledWith('unit.test');
      expect(cacheValue).toEqual('cached-value');
    });

    it('should store value on cache and return it', async () => {
      jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined);

      const cacheValue = await service.getCache<string>('unit.test', () =>
        Promise.resolve('not-cached-value'),
      );

      expect(cacheManager.set).toHaveBeenCalledWith(
        'unit.test',
        'not-cached-value',
      );
      expect(cacheValue).toEqual('not-cached-value');
    });
  });
});
