import { ICreatePayment } from '../models/ICreatePayment';
import { IFindByCustomerProduct } from '../models/IFindByCustomerProduct';
import { IPayment } from '../models/IPayment';

export interface IPaymentRepository {
  findById(id: string): Promise<IPayment | undefined>;

  findByCustomerAndProductId({
    customer_id,
    product_id,
  }: IFindByCustomerProduct): Promise<IPayment | undefined>;

  create({
    payment_date,
    customer_id,
    product_id,
  }: ICreatePayment): Promise<IPayment>;

  findByCustomerId(customer_id: string): Promise<IPayment | undefined>;

  remove(id: string): Promise<void>;
}
