import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    const cityKey = `cities-${stateId}`;

    const cachedCities = await this.cacheManager.get<
      Promise<CityEntity[]> | undefined
    >(cityKey);

    if (cachedCities) {
      return cachedCities;
    }

    const cities = await this.cityRepository.findBy({ stateId: stateId });

    this.cacheManager.set(cityKey, cities);

    return cities;
  }
}
