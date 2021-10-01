import ProductRepository from '../../infra/fake/repositories/FakeProductRepository';
import AppError from '../../../../shared/errors/AppError';
import CreateProductService from './CreateProductService';
import { Type } from '../../domain/enums/Type';

let createProductService: CreateProductService;
let productRepository: ProductRepository;

describe('CreateProductService', () => {
  beforeEach(() => {
    productRepository = new ProductRepository();
    createProductService = new CreateProductService(productRepository);
  });

  it('should create a product successfully', async () => {
    const product = await createProductService.execute({
      name: 'Product One',
      value: 10.99,
      type: 'monthly' as Type,
      active: true,
    });

    expect(product).toHaveProperty('id');
  });

  it('should return an error when creating two products with the same name', async () => {
    await createProductService.execute({
      name: 'Product One',
      value: 10.99,
      type: 'monthly' as Type,
      active: true,
    });

    expect(
      createProductService.execute({
        name: 'Product One',
        value: 10.99,
        type: 'yearly' as Type,
        active: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error when creating a product with invalid type', async () => {
    expect(
      createProductService.execute({
        name: 'Product One',
        value: 10.99,
        type: 'yearlys' as Type,
        active: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
