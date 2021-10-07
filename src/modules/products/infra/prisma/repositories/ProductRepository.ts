import { PrismaClient } from '@prisma/client';
import { Type } from 'src/modules/products/domain/enums/Type';
import { ICreateProduct } from '../../../domain/models/ICreateProduct';
import { IProduct } from '../../../domain/models/IProduct';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import Product from '../models/Product';

class ProductRepository implements IProductRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const productFind = await this.client.product.findFirst({
      where: {
        id,
      },
    });

    if (!productFind) {
      return undefined;
    }

    const { name, value, type, active } = productFind;

    const product = new Product(id, name, Number(value), type as Type, active);

    return product;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const productFind = await this.client.product.findFirst({
      where: {
        name,
      },
    });

    if (!productFind) {
      return undefined;
    }

    const { id, value, type, active } = productFind;

    const product = new Product(id, name, Number(value), type as Type, active);

    return product;
  }

  public async findAll(): Promise<IProduct[]> {
    const products: Product[] = [];

    const productsFind = await this.client.product.findMany();

    productsFind.forEach(productFind => {
      var { id, name, value, type, active } = productFind;

      var product = new Product(id, name, Number(value), type as Type, active);

      products.push(product);
    });

    return products;
  }

  public async create({
    name,
    value,
    type,
    active,
  }: ICreateProduct): Promise<IProduct> {
    const productCreated = await this.client.product.create({
      data: {
        name,
        value,
        type,
        active: active || true,
      },
    });

    const product = new Product(
      productCreated.id,
      productCreated.name,
      Number(productCreated.value),
      productCreated.type as Type,
      productCreated.active,
    );

    return product;
  }

  public async save({
    id,
    name,
    value,
    type,
    active,
  }: IProduct): Promise<IProduct> {
    const productUpdated = await this.client.product.update({
      where: {
        id,
      },
      data: {
        name,
        value,
        type,
        active,
      },
    });

    const product = new Product(
      productUpdated.id,
      productUpdated.name,
      Number(productUpdated.value),
      productUpdated.type as Type,
      productUpdated.active,
    );

    return product;
  }

  public async remove(product: IProduct): Promise<IProduct> {
    const productUpdated = await this.client.product.update({
      where: {
        id: product.id,
      },
      data: {
        active: false,
      },
    });

    const productDeleted = new Product(
      productUpdated.id,
      productUpdated.name,
      Number(productUpdated.value),
      productUpdated.type as Type,
      productUpdated.active,
    );

    return productDeleted;
  }
}

export default ProductRepository;
