import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dtos/category-create.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create({ name }: CategoryCreateDto): Promise<CategoryEntity> {
    const checkDuplicate = await this.categoryRepository.findOneBy({ name });

    if (checkDuplicate) {
      throw new BadRequestException('Category already exists');
    }

    return this.categoryRepository.save({ name });
  }

  async getAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async getById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException(`Category ID: ${id} does not exists`);
    }

    return category;
  }
}
