import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async getByUser(userId: number) {
    const addresses = await this.addressRepository.find({
      where: { userId },
      relations: ['city.state'],
    });

    if (!addresses.length) {
      throw new NotFoundException(`No address found for user:${userId}`);
    }

    return addresses;
  }

  async create(
    address: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.getUserById(userId);
    await this.cityService.getCityById(address.cityId);

    return this.addressRepository.save({ userId, ...address });
  }
}
