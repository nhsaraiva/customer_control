import AppError from '../../../../shared/errors/AppError';
import { IShowProduct } from '../../domain/models/IShowProduct';
import { IProduct } from '../../domain/models/IProduct';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
