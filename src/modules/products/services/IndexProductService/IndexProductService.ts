import { IProduct } from '../../domain/models/IProduct';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

class IndexProductService {
  constructor(private repository: IProductRepository) {}

  public async execute(): Promise<IProduct[]> {
    const products = await this.repository.findAll();

    return products;
  }
}
export default IndexProductService;
