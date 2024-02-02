import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const checkEmail = await this.getUserByEmail(user.email).catch(
      () => undefined,
    );

    if (checkEmail) {
      throw new ConflictException('Email is already registered in the system');
    }

    const hashedPassword = await hash(user.password, 10);

    return this.userRepository.save({
      ...user,
      typeUser: 1,
      password: hashedPassword,
    });
  }

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User ID not found');
    }

    return user;
  }

  async getUserByIdWithRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['addresses.city.state'],
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User email not found');
    }

    return user;
  }
}
