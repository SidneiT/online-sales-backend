import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/return-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAllUsers();
    return ReturnUserDto.map(users);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    const newUser = await this.userService.createUser(user);
    return new ReturnUserDto(newUser);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: number) {
    const newUser = await this.userService.getUserByIdWithRelations(userId);
    return new ReturnUserDto(newUser);
  }
}
