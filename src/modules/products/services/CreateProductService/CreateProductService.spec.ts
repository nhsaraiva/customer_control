import ProductRepository from '../../infra/fake/repositories/FakeProductRepository';
import AppError from '../../../../shared/errors/AppError';
import CreateProductService from './CreateProductService';

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
      payment_type: 'Monthly',
      active: 1,
    });

    expect(product).toHaveProperty('id');
  });

  it('should return an error when creating two products with the same name', async () => {
    await createProductService.execute({
      name: 'Product One',
      value: 10.99,
      payment_type: 'Monthly',
      active: 1,
    });

    expect(
      createProductService.execute({
        name: 'Product One',
        value: 10.99,
        payment_type: 'Yearly',
        active: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
