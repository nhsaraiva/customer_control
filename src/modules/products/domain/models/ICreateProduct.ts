import { Type } from '../enums/Type';

export interface ICreateProduct {
  name: string;
  value: number;
  type: Type;
  active?: boolean;
}
