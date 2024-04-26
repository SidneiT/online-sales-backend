import { IsNumber, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsNumber()
  categoryId: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;
}
