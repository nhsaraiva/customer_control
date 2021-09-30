import { Type } from '../../../domain/enums/Type';
import { IProduct } from '../../../domain/models/IProduct';

class FakeProduct implements IProduct {
  id: string = '';
  name: string = '';
  type: Type = 'perpetual' as Type;
  value: number = 0;
  active: boolean = true;
}

export default FakeProduct;
