import { CityEntity } from '../entities/city.entity';
import { ReturnStateDto } from 'src/modules/state/dtos/return-state.dto';

export class ReturnCityDto {
  id: number;
  name: string;
  state?: ReturnStateDto;

  constructor({ id, name, state }: CityEntity) {
    this.id = id;
    this.name = name;
    this.state = state ? new ReturnStateDto(state) : undefined;
  }

  static map(cities: CityEntity[]): ReturnCityDto[] {
    return cities.map((city) => new ReturnCityDto(city));
  }
}
