import { Status } from '../enums/Status';

export interface IUpdateCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: Status;
}
