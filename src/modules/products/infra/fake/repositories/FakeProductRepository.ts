import { v4 as uuidv4 } from 'uuid';
import { Type } from '../../../domain/enums/Type';
import { ICreateProduct } from '../../../domain/models/ICreateProduct';
import { IProduct } from '../../../domain/models/IProduct';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import FakeProduct from '../entities/FakeProduct';

class FakeProductRepository implements IProductRepository {
  private products: IProduct[] = [];

  public async create({
    name,
    value,
    type,
    active,
  }: ICreateProduct): Promise<IProduct> {
    const product = new FakeProduct();

    product.id = uuidv4();
    product.name = name;
    product.value = value;
    product.type = type as Type;
    product.active = active || true;

    this.products.push(product);

    return product;
  }

  public async findAll(): Promise<IProduct[]> {
    return this.products;
  }

  public async remove(product: IProduct): Promise<IProduct> {
    product.active = false;

    return await this.save(product);
  }

  public async save(product: IProduct): Promise<IProduct> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = this.products.find(product => product.name === name);

    return product;
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = this.products.find(product => product.id === id);

    return product;
  }
}

export default FakeProductRepository;
