import DeleteProductService from './DeleteProductService';
import ProductRepository from '../../infra/fake/repositories/FakeProductRepository';
import { IProduct } from '../../domain/models/IProduct';
import AppError from '../../../../shared/errors/AppError';

let productRepository: ProductRepository;
let deleteProductService: DeleteProductService;
let productCreated: IProduct;

describe('DeleteProductService', () => {
  beforeEach(async () => {
    productRepository = new ProductRepository();

    productCreated = await productRepository.create({
      name: 'Product One',
      value: 10.99,
      payment_type: 'Monthly',
      active: 1,
    });

    deleteProductService = new DeleteProductService(productRepository);
  });

  it('should return void if product deleted', async () => {
    const product = await deleteProductService.execute({
      id: productCreated.id,
    });

    expect(product.active).toBe(false);
  });

  it('should return error if product not exists', async () => {
    expect(
      await deleteProductService.execute({
        id: 'idnotexists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
