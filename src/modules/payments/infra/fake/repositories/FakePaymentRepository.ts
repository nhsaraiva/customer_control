import { IPayment } from '../../../domain/models/IPayment';
import { v4 as uuidv4 } from 'uuid';
import { ICreatePayment } from '../../../domain/models/ICreatePayment';
import { IPaymentRepository } from '../../../domain/repositories/IPaymentRepository';
import FakePayment from '../entities/FakePayment';
import { IFindByCustomerProduct } from 'src/modules/payments/domain/models/IFindByCustomerProduct';

class FakePaymentRepository implements IPaymentRepository {
  private payments: IPayment[] = [];

  public async create({
    payment_date,
    customer_id,
    product_id,
  }: ICreatePayment): Promise<IPayment> {
    const payment = new FakePayment();

    payment.id = uuidv4();
    payment.payment_date = payment_date;
    payment.customer_id = customer_id;
    payment.product_id = product_id;

    this.payments.push(payment);

    return payment;
  }

  public async findAll(): Promise<IPayment[]> {
    return this.payments;
  }

  public async remove(id: string): Promise<void> {
    return;
  }

  public async findByCustomerAndProductId({
    customer_id,
    product_id,
  }: IFindByCustomerProduct): Promise<IPayment | undefined> {
    const payment = this.payments.find(
      payment =>
        payment.customer_id === customer_id &&
        payment.product_id === product_id,
    );

    return payment;
  }

  public async findById(id: string): Promise<IPayment | undefined> {
    const payment = this.payments.find(payment => payment.id === id);

    return payment;
  }

  public async findByCustomerId(
    customer_id: string,
  ): Promise<IPayment | undefined> {
    const payment = this.payments.find(
      payment => payment.customer_id === customer_id,
    );

    return payment;
  }
}

export default FakePaymentRepository;
