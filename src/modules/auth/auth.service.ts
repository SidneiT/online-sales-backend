import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { ReturnUserDto } from '../user/dtos/return-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLoginDto } from './dtos/return-login.dto';
import { TokenPayloadDto } from './dtos/token-payload.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(email)
      .catch(() => undefined);

    const isMatch = await compare(password, user?.password ?? '');

    if (!isMatch) {
      throw new UnauthorizedException('User email or password are invalid');
    }

    const accessToken = this.jwtService.sign({
      ...new TokenPayloadDto(user),
    });

    return {
      user: new ReturnUserDto(user),
      accessToken,
    };
  }
}
