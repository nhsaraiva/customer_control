import AppError from '../../../../shared/errors/AppError';
import { IProduct } from '../../domain/models/IProduct';
import { IRemoveProduct } from '../../domain/models/IRemoveProduct';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

class DeleteProductService {
  constructor(private repository: IProductRepository) {}

  public async execute({ id }: IRemoveProduct): Promise<IProduct> {
    const productExists = await this.repository.findById(id);

    if (!productExists) {
      throw new AppError('Product not found');
    }

    const product = await this.repository.remove(productExists);

    return product;
  }
}
export default DeleteProductService;
