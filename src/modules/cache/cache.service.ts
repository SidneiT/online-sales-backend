import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache<T>(key: string, callback: () => Promise<T>): Promise<T> {
    const cachedValue: T = await this.cacheManager.get(key);

    if (cachedValue) {
      return cachedValue;
    }

    const newData = await callback();

    this.cacheManager.set(key, newData);

    return newData;
  }
}
