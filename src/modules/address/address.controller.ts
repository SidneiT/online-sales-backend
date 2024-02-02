import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressService } from './address.service';
import { Roles } from '../../decorators/roles.decorator';
import { UserType } from '../user/enums/user-type.enum';
import { UserId } from '../../decorators/user-id.decorator';

@Roles(UserType.User)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getByUserId(@Query() { userId }: { userId: number }) {
    return this.addressService.getByUser(userId);
  }

  @Post()
  create(
    @UserId() userId: number,
    @Body() { ...address }: CreateAddressDto & { userId: number },
  ) {
    return this.addressService.create(address, userId);
  }
}
