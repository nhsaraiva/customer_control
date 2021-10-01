import { IPayment } from '../../../domain/models/IPayment';

class FakePayment implements IPayment {
  id: string = '';
  payment_date: string = '';
  customer_id: string = '';
  product_id: string = '';
}

export default FakePayment;
