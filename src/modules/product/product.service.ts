import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './dtos/product-create.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(payload: ProductCreateDto): Promise<ProductEntity> {
    const category = this.categoryService
      .getById(payload.categoryId)
      .catch(() => undefined);

    if (!category) {
      throw new BadRequestException(`Category id not found`);
    }

    return this.productRepository.save(payload);
  }

  getAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async getById(id: number): Promise<ProductEntity> {
    const productDetails = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!productDetails) {
      throw new NotFoundException(`Product ID: ${id} does not exist`);
    }

    return productDetails;
  }
}
