import { cityEntityMock } from '../../../modules/city/__mock__/city.mock';
import { CreateAddressDto } from '../dtos/create-address.dto';

export const createAddressMock: CreateAddressDto = {
  cep: '00001-590',
  cityId: cityEntityMock.id,
  complement: 'a1',
  number: 123,
};
