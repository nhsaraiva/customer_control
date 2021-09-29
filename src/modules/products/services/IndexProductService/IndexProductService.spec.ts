import IndexProductService from './IndexProductService';
import ProductRepository from '../../infra/fake/repositories/FakeProductRepository';
import { IProduct } from '../../domain/models/IProduct';
import AppError from '../../../../shared/errors/AppError';

let productRepository: ProductRepository;
let indexProductService: IndexProductService;

describe('IndexProductService', () => {
  beforeEach(async () => {
    productRepository = new ProductRepository();

    indexProductService = new IndexProductService(productRepository);
  });

  it('should return one product if has products', async () => {
    await productRepository.create({
      name: 'Product One',
      value: 10.99,
      payment_type: 'Monthly',
      active: 1,
    });

    expect(indexProductService.execute()).resolves.toHaveLength(1);
  });

  it('should return void array if not has products', async () => {
    expect(indexProductService.execute()).resolves.toHaveLength(0);
  });
});
