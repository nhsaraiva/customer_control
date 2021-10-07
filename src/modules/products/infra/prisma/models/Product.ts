import { IProduct } from 'src/modules/products/domain/models/IProduct';
import { Type } from '../../../domain/enums/Type';

class Product implements IProduct {
  constructor(
    public id: string,
    public name: string,
    public value: number,
    public type: Type,
    public active: boolean,
  ) {}
}

export default Product;
