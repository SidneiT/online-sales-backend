import { CityEntity } from '../entities/city.entity';
import { ReturnStateDto } from '../../../modules/state/dtos/return-state.dto';

export class ReturnCityDto {
  name: string;
  state?: ReturnStateDto;

  constructor({ name, state }: CityEntity) {
    this.name = name;
    this.state = state ? new ReturnStateDto(state) : undefined;
  }

  static map(cities: CityEntity[]): ReturnCityDto[] {
    return cities.map((city) => new ReturnCityDto(city));
  }
}
