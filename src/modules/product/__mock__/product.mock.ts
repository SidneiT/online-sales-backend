import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  id: 1,
  name: 'Mocked Product Name',
  price: 1.5,
  image: '',
  categoryId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
