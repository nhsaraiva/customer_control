import DeletePaymentService from './DeletePaymentService';
import PaymentRepository from '../../infra/fake/repositories/FakePaymentRepository';
import { IPayment } from '../../domain/models/IPayment';
import AppError from '../../../../shared/errors/AppError';

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
      stauts: 'active',
    });

    let productRepository = new ProductRepository();
    let product = await productRepository.create({
      name: 'Product One',
      value: 10.99,
      payment_type: 'Monthly',
      active: 1,
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
    ).resolves.toBeNull();
  });

  it('should return error if payment not exists', async () => {
    expect(
      await deletePaymentService.execute({
        id: 'idnotexists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
