import { PrismaClient } from '@prisma/client';
import { ICreatePayment } from '../../../domain/models/ICreatePayment';
import { IFindByCustomerProduct } from '../../../domain/models/IFindByCustomerProduct';
import { IPayment } from '../../../domain/models/IPayment';
import { IPaymentRepository } from '../../../domain/repositories/IPaymentRepository';

class PaymentRepository implements IPaymentRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async findById(id: string): Promise<IPayment | undefined> {
    const payment = await this.client.payment.findFirst({
      where: {
        id,
      },
    });

    if (!payment) {
      return undefined;
    }

    return payment;
  }

  public async findByCustomerAndProductId({
    customer_id,
    product_id,
  }: IFindByCustomerProduct): Promise<IPayment | undefined> {
    const payment = await this.client.payment.findFirst({
      where: {
        customer_id,
        product_id,
      },
    });

    if (!payment) {
      return undefined;
    }

    return payment;
  }

  public async create({
    payment_date,
    customer_id,
    product_id,
  }: ICreatePayment): Promise<IPayment> {
    return await this.client.payment.create({
      data: {
        payment_date,
        customer_id,
        product_id,
      },
    });
  }

  public async findByCustomerId(
    customer_id: string,
  ): Promise<IPayment | undefined> {
    const payment = await this.client.payment.findFirst({
      where: {
        customer_id,
      },
    });

    if (!payment) {
      return undefined;
    }

    return payment;
  }

  public async remove(id: string): Promise<void> {
    await this.client.payment.delete({
      where: {
        id,
      },
    });
  }
}
export default PaymentRepository;
