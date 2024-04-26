import { productMock } from '../../../modules/product/__mock__/product.mock';
import { CategoryEntity } from '../entities/category.entity';

export const categoryMock: CategoryEntity = {
  id: 1,
  name: 'Mocked Category Name',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const categoryMockWithProducts: CategoryEntity = {
  id: 1,
  name: 'Mocked Category Name',
  createdAt: new Date(),
  updatedAt: new Date(),
  products: [productMock],
};
