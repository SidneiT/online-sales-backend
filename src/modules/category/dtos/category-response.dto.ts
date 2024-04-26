import { ProductResponseDto } from 'src/modules/product/dtos/product-response.dto';

import { CategoryEntity } from '../entities/category.entity';

export class CategoryResponseDto {
  id: number;
  name: string;
  products: ProductResponseDto[];

  constructor({ id, name, products }: CategoryEntity) {
    this.id = id;
    this.name = name;
    this.products = products ? ProductResponseDto.map(products) : undefined;
  }

  static map(users: CategoryEntity[]): CategoryResponseDto[] {
    return users.map((user) => new CategoryResponseDto(user));
  }
}
