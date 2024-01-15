import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getByUserId(@Query() { userId }: { userId: number }) {
    return this.addressService.getByUser(userId);
  }

  @Post()
  create(
    @Body() { userId, ...address }: CreateAddressDto & { userId: number },
  ) {
    return this.addressService.create(address, userId);
  }
}
