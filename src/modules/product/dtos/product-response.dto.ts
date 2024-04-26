import { CategoryResponseDto } from 'src/modules/category/dtos/category-response.dto';

import { ProductEntity } from '../entities/product.entity';

export class ProductResponseDto {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  image: string;
  category: CategoryResponseDto;

  constructor({ id, categoryId, name, price, image, category }: ProductEntity) {
    this.id = id;
    this.categoryId = categoryId;
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category ? new CategoryResponseDto(category) : undefined;
  }

  static map(products: ProductEntity[]): ProductResponseDto[] {
    return products?.map((user) => new ProductResponseDto(user)) ?? [];
  }
}
