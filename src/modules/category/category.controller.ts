import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryCreateDto } from './dtos/category-create.dto';
import { CategoryService } from './category.service';
import { CategoryResponseDto } from './dtos/category-response.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from '../user/enums/user-type.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserType.Admin)
  @Post()
  async create(@Body() payload: CategoryCreateDto) {
    const category = await this.categoryService.create(payload);
    return new CategoryResponseDto(category);
  }

  @Roles(UserType.User, UserType.Admin)
  @Get()
  async list() {
    const categories = await this.categoryService.getAll();
    return CategoryResponseDto.map(categories);
  }

  @Roles(UserType.User, UserType.Admin)
  @Get('/:categoryId')
  async getOne(@Param('categoryId') categoryId: number) {
    const categories = await this.categoryService.getById(categoryId);
    return new CategoryResponseDto(categories);
  }
}
