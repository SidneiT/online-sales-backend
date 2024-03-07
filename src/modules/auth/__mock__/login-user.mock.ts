import { userEntityMock } from '../../../modules/user/__mock__/user.mock';
import { LoginDto } from '../dtos/login.dto';

export const userLoginMock: LoginDto = {
  email: userEntityMock.email,
  password: 'abc123',
};
