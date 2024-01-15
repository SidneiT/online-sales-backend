import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnUserDto } from '../user/dtos/return-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() userLogin: LoginDto): Promise<ReturnUserDto> {
    const user = await this.authService.signIn(userLogin);
    return new ReturnUserDto(user);
  }
}
