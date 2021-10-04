import { inject, injectable } from 'tsyringe';
import { IProduct } from '../../domain/models/IProduct';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

@injectable()
class IndexProductService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  public async execute(): Promise<IProduct[]> {
    const products = await this.repository.findAll();

    return products;
  }
}
export default IndexProductService;
