import { Type } from '../enums/Type';

export interface IUpdateProduct {
  id: string;
  name: string;
  value: number;
  type: string;
  active: boolean;
}
