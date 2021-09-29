import ShowProductService from './ShowProductService';
import ProductRepository from '../../infra/fake/repositories/FakeProductRepository';
import { IProduct } from '../../domain/models/IProduct';
import AppError from '../../../../shared/errors/AppError';

let productRepository: ProductRepository;
let showProductService: ShowProductService;
let productCreated: IProduct;

describe('ShowProductService', () => {
  beforeEach(async () => {
    productRepository = new ProductRepository();

    productCreated = await productRepository.create({
      name: 'Product One',
      value: 10.99,
      payment_type: 'Monthly',
      active: 1,
    });

    showProductService = new ShowProductService(productRepository);
  });

  it('should return success if product exists', async () => {
    const product = await showProductService.execute({
      id: productCreated.id,
    });

    expect(product).toHaveProperty('id');
  });

  it('should return an error if product not exists', async () => {
    expect(
      showProductService.execute({
        id: 'notexistsid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
