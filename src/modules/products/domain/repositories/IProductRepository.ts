import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';

export interface IProductRepository {
  findById(id: string): Promise<IProduct | undefined>;
  findByName(name: string): Promise<IProduct | undefined>;
  findAll(): Promise<IProduct[]>;
  create({ name, value, type, active }: ICreateProduct): Promise<IProduct>;
  save({ id, name, value, type, active }: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<IProduct>;
}
