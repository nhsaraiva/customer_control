import AppError from '../../../../shared/errors/AppError';
import { IUpdateProduct } from '../../domain/models/IUpdateProduct';
import { IProduct } from '../../domain/models/IProduct';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Type } from '../../domain/enums/Type';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository') private repository: IProductRepository,
  ) {}

  public async execute({
    id,
    name,
    value,
    type,
    active,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productHasThisName = await this.repository.findByName(name);

    if (productHasThisName && productHasThisName.id != product.id) {
      throw new AppError('Name already exists to antoher product');
    }

    if (!Object.values(Type).includes(type as Type)) {
      throw new AppError('Type is not valid');
    }

    product.name = name;
    product.value = value;
    product.type = type as Type;
    product.active = active;

    await this.repository.save(product);

    return product;
  }
}
export default UpdateProductService;
