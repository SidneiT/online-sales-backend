import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductResponseDto } from './dtos/product-response.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() payload: ProductCreateDto) {
    const product = await this.productService.create(payload);
    return new ProductResponseDto(product);
  }

  @Get()
  async getAll() {
    const products = await this.productService.getAll();
    return ProductResponseDto.map(products);
  }

  @Get('/:productId')
  async getOne(@Param('productId') productId: number) {
    const product = await this.productService.getById(productId);
    return new ProductResponseDto(product);
  }
}
