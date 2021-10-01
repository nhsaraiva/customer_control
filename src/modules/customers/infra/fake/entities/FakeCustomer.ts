import { Status } from 'src/modules/customers/domain/enums/Status';
import { ICustomer } from '../../../domain/models/ICustomer';

class FakeCustomer implements ICustomer {
  id: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  status: Status = 'active' as Status;
}

export default FakeCustomer;
