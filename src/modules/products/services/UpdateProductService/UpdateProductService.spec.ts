import UpdateProductService from './UpdateProductService';
import ProductRepository from '../../infra/fake/repositories/FakeProductRepository';
import { IProduct } from '../../domain/models/IProduct';
import AppError from '../../../../shared/errors/AppError';
import { Type } from '../../domain/enums/Type';

let productRepository: ProductRepository;
let updateProductService: UpdateProductService;
let productCreated: IProduct;

describe('UpdateProductService', () => {
  beforeEach(async () => {
    productRepository = new ProductRepository();

    productCreated = await productRepository.create({
      name: 'Product One',
      value: 10.99,
      type: 'monthly' as Type,
      active: true,
    });

    await productRepository.create({
      name: 'Product Two',
      value: 10.99,
      type: 'yearly' as Type,
      active: true,
    });

    updateProductService = new UpdateProductService(productRepository);
  });

  it('should return updated product if name not exists in another products', async () => {
    let updatedProduct = await updateProductService.execute({
      id: productCreated.id,
      name: 'Product One Updated',
      value: 10.99,
      type: 'monthly',
      active: true,
    });

    expect(await productRepository.findById(productCreated.id)).toMatchObject(
      updatedProduct,
    );
  });

  it('should return error if product not exists', async () => {
    expect(
      updateProductService.execute({
        id: 'idnotexists',
        name: 'Product One',
        value: 10.99,
        type: 'monthly',
        active: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error if type product not is valid', async () => {
    expect(
      updateProductService.execute({
        id: productCreated.id,
        name: 'Product One Updated',
        value: 10.99,
        type: 'monthlys',
        active: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error if name exists in another products', async () => {
    expect(
      updateProductService.execute({
        id: productCreated.id,
        name: 'Product Two',
        value: 10.99,
        type: 'monthly',
        active: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
