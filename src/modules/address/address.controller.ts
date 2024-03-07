import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressService } from './address.service';
import { Roles } from '../../decorators/roles.decorator';
import { UserType } from '../user/enums/user-type.enum';
import { UserId } from '../../decorators/user-id.decorator';
import { ReturnAddressDto } from './dtos/return-address.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getByUserId(@Query() { userId }: { userId: number }) {
    return ReturnAddressDto.map(await this.addressService.getByUser(userId));
  }

  @Post()
  create(
    @UserId() userId: number,
    @Body() { ...address }: CreateAddressDto & { userId: number },
  ) {
    return this.addressService.create(address, userId);
  }
}
