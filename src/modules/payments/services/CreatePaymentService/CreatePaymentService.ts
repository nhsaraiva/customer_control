import { ICustomerRepository } from '../../../customers/domain/repositories/ICustomerRepository';
import { Type } from '../../../products/domain/enums/Type';
import { IProductRepository } from '../../../products/domain/repositories/IProductRepository';
import { ICreatePayment } from '../../domain/models/ICreatePayment';
import { IPaymentRepository } from '../../domain/repositories/IPaymentRepository';
import AppError from '../../../../shared/errors/AppError';
import { IPayment } from '../../domain/models/IPayment';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreatePaymentService {
  constructor(
    @inject('PaymentRepository')
    private repository: IPaymentRepository,
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    payment_date,
    customer_id,
    product_id,
  }: ICreatePayment): Promise<IPayment> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const customer = await this.customerRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    if (product.type == Type.perpetual) {
      const hasPaymentForThisPerpetualProduct =
        await this.repository.findByCustomerAndProductId({
          customer_id,
          product_id,
        });

      if (hasPaymentForThisPerpetualProduct) {
        throw new AppError('This customer has already paid for this product');
      }
    }

    const payment = await this.repository.create({
      payment_date,
      customer_id,
      product_id,
    });

    return payment;
  }
}
export default CreatePaymentService;
