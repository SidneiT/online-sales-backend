import { ReturnCityDto } from '../../../modules/city/dtos/return-city.dto';

import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  number: number;
  cep: string;
  city?: ReturnCityDto;

  constructor({ complement, number, cep, city }: AddressEntity) {
    this.complement = complement;
    this.number = number;
    this.cep = cep;
    this.city = city ? new ReturnCityDto(city) : undefined;
  }

  static map(addresses: AddressEntity[]): ReturnAddressDto[] {
    return addresses.map((address) => new ReturnAddressDto(address));
  }
}
