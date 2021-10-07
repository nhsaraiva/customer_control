import { Status } from '../../../domain/enums/Status';
import { ICustomer } from '../../../domain/models/ICustomer';

class Customer implements ICustomer {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public status: Status,
  ) {}
}

export default Customer;
