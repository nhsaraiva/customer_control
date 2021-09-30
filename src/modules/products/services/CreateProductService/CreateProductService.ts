import AppError from '../../../../shared/errors/AppError';
import { ICreateProduct } from '../../domain/models/ICreateProduct';
import { IProduct } from '../../domain/models/IProduct';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

class CreateProductService {
  constructor(private repository: IProductRepository) {}

  public async execute({
    name,
    value,
    type,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.repository.findByName(name);

    if (productExists) {
      throw new AppError('This product exists');
    }

    const product = await this.repository.create({
      name,
      value,
      type,
      active: true,
    });

    return product;
  }
}

export default CreateProductService;
