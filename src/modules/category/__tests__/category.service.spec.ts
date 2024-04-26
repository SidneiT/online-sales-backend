import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { categoryCreateMock } from '../__mock__/category-create.mock';
import {
  categoryMock,
  categoryMockWithProducts,
} from '../__mock__/category.mock';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(null),
            save: jest.fn().mockResolvedValue(categoryMock),
            find: jest.fn().mockResolvedValue([categoryMock]),
            findOne: jest.fn().mockResolvedValue(categoryMockWithProducts),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return new category', async () => {
      const newCategory = await service.create(categoryCreateMock);
      expect(newCategory).toEqual(categoryMock);
    });

    it('should throw error when category already exists', () => {
      jest
        .spyOn(categoryRepository, 'findOneBy')
        .mockResolvedValueOnce(categoryMock);
      expect(service.create(categoryCreateMock)).rejects.toThrow();
    });

    it('should throw error when repository fail', () => {
      jest
        .spyOn(categoryRepository, 'findOneBy')
        .mockRejectedValueOnce(new Error());
      expect(service.create(categoryCreateMock)).rejects.toThrow();
    });
  });

  describe('getAll', () => {
    it('should return all categories', async () => {
      const categories = await service.getAll();
      expect(categories).toEqual([categoryMock]);
    });

    it('should throw error when repository fail', () => {
      jest.spyOn(categoryRepository, 'find').mockRejectedValueOnce(new Error());
      expect(service.getAll()).rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('should return category by id', async () => {
      const category = await service.getById(categoryMockWithProducts.id);
      expect(category).toEqual(categoryMockWithProducts);
      expect(categoryRepository.findOne).toHaveBeenCalledWith({
        where: { id: categoryMockWithProducts.id },
        relations: ['products'],
      });
    });

    it('should throw error when categoryId does not exists', () => {
      jest.spyOn(categoryRepository, 'findOne').mockResolvedValueOnce(null);
      const category = service.getById(categoryMockWithProducts.id);
      expect(category).rejects.toThrow();
      expect(category).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should throw error when repository fail', () => {
      jest
        .spyOn(categoryRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      const category = service.getById(categoryMockWithProducts.id);
      expect(category).rejects.toThrow();
    });
  });
});
