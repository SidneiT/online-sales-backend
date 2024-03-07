import { LoginDto } from '../../auth/dtos/login.dto';
import { userEntityMock } from '../../user/__mock__/user.mock';

export const userLoginMock: LoginDto = {
  email: userEntityMock.email,
  password: 'abc123',
};
