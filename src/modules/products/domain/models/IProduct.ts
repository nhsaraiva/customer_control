import { Type } from '../enums/Type';

export interface IProduct {
  id: string;
  name: string;
  value: number;
  type: Type;
  active: boolean;
}
