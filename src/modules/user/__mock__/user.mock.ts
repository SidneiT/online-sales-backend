import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enums/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '12332112323',
  email: 'mockemail@mail.com',
  id: 1233,
  name: 'Mocked Name',
  password: '$2b$10$1m8Ja93dzpfNNJ5PKoYDo.3oU2hqXC1la82s/ISCA65uVpSJeyiNS',
  phone: '11923232342',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
