import { cityEntityMock } from '../../../modules/city/__mock__/city.mock';
import { AddressEntity } from '../entities/address.entity';

export const addressEntityMock: AddressEntity = {
  id: 1,
  cep: '00001-590',
  cityId: cityEntityMock.id,
  complement: 'a1',
  number: 123,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
