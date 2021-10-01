import { Status } from '../enums/Status';

export interface ICreateCustomer {
  name: string;
  email: string;
  phone: string;
  status: Status;
}
