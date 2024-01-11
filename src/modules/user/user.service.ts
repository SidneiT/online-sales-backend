import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getAllUsers(): Promise<Array<UserEntity>> {
    return this.userRepository.find();
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await hash(user.password, 10);

    return this.userRepository.save({
      ...user,
      typeUser: 1,
      password: hashedPassword,
    });
  }
}
