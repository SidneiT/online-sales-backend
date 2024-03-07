import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '../../../modules/user/user.service';
import { userEntityMock } from '../../../modules/user/__mock__/user.mock';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { ReturnUserDto } from '../../../modules/user/dtos/return-user.dto';
import { jwtMock } from '../__mock__/jwt.mock';
import { userLoginMock } from '../__mock__/login-user.mock';

describe('StateService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return user with access token', async () => {
      const loggedUser = await service.signIn(userLoginMock);

      expect(loggedUser).toEqual({
        user: new ReturnUserDto(userEntityMock),
        accessToken: jwtMock,
      });
    });

    it('should throws error if email is invalid', () => {
      jest
        .spyOn(userService, 'getUserByEmail')
        .mockResolvedValueOnce(undefined);

      const loggedUser = service.signIn({
        email: 'mail@gmai.com',
        password: userLoginMock.password,
      });

      expect(loggedUser).rejects.toThrow();
    });

    it('should throws error if password is invalid', () => {
      const loggedUser = service.signIn({
        email: userLoginMock.email,
        password: 'abc1234',
      });

      expect(loggedUser).rejects.toThrow();
    });

    it('should throws error if UserService throws error', () => {
      jest
        .spyOn(userService, 'getUserByEmail')
        .mockRejectedValueOnce(new Error());

      expect(service.signIn(userLoginMock)).rejects.toThrow();
    });
  });
});
