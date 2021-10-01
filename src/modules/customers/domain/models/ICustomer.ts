import { Status } from '../enums/Status';

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: Status;
}
