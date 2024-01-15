import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from '../user/entities/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn({ email, password }: LoginDto): Promise<UserEntity> {
    const user = await this.userService
      .getUserByEmail(email)
      .catch(() => undefined);

    const isMatch = await compare(password, user?.password ?? '');

    if (!isMatch) {
      throw new UnauthorizedException('User email or password are invalid');
    }

    return user;
  }
}
