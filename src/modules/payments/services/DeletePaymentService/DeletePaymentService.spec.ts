import DeletePaymentService from './DeletePaymentService';
import PaymentRepository from '../../infra/fake/repositories/FakePaymentRepository';
import { IPayment } from '../../domain/models/IPayment';
import CustomerRepository from '../../../customers/infra/fake/repositories/FakeCustomerRepository';
import ProductRepository from '../../../products/infra/fake/repositories/FakeProductRepository';
import AppError from '../../../../shared/errors/AppError';
import { Status } from '../../../customers/domain/enums/Status';
import { Type } from '../../../products/domain/enums/Type';

let paymentRepository: PaymentRepository;
let deletePaymentService: DeletePaymentService;
let paymentCreated: IPayment;

describe('DeletePaymentService', () => {
  beforeEach(async () => {
    paymentRepository = new PaymentRepository();

    let customerRepository = new CustomerRepository();
    let customer = await customerRepository.create({
      name: 'Customer One',
      email: 'customer@one.com',
      phone: '11958874800',
      status: 'active' as Status,
    });

    let productRepository = new ProductRepository();
    let product = await productRepository.create({
      name: 'Product One',
      value: 10.99,
      type: 'monthly' as Type,
      active: true,
    });

    paymentCreated = await paymentRepository.create({
      payment_date: '2021-09-29',
      customer_id: customer.id,
      product_id: product.id,
    });

    deletePaymentService = new DeletePaymentService(paymentRepository);
  });

  it('should return void if payment deleted', async () => {
    expect(
      deletePaymentService.execute({
        id: paymentCreated.id,
      }),
    ).resolves.toBeUndefined();
  });

  it('should return error if payment not exists', async () => {
    expect(
      deletePaymentService.execute({
        id: 'idnotexists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
