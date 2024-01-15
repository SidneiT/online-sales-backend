import { UserEntity } from '../entities/user.entity';
import { ReturnAddressDto } from 'src/modules/address/dtos/return-address.dto';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ReturnAddressDto[];

  constructor({ id, name, email, phone, cpf, addresses }: UserEntity) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cpf = cpf;
    this.addresses = addresses ? ReturnAddressDto.map(addresses) : undefined;
  }

  static map(users: UserEntity[]): ReturnUserDto[] {
    return users.map((user) => new ReturnUserDto(user));
  }
}
