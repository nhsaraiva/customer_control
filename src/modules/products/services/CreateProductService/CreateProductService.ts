import AppError from '../../../../shared/errors/AppError';
import { Type } from '../../domain/enums/Type';
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
    if (!Object.values(Type).includes(type as Type)) {
      throw new AppError('Type is not valid');
    }

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
