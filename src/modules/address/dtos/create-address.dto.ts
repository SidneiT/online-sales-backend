import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  complement: string;

  @IsNumber()
  number: number;

  @IsString()
  cep: string;

  @IsNumber()
  cityId: number;
}
