import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache<S>(key: string, callback: () => Promise<S>): Promise<S> {
    const cachedValue: S = await this.cacheManager.get(key);

    if (cachedValue) {
      return cachedValue;
    }

    const newData = await callback();

    this.cacheManager.set(key, newData);

    return newData;
  }
}
