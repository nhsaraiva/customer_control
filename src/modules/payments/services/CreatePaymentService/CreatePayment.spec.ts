import PaymentRepository from '../../infra/fake/repositories/FakePaymentRepository';
import AppError from '../../../../shared/errors/AppError';
import CreatePaymentService from './CreatePaymentService';

let createPaymentService: CreatePaymentService;
let paymentRepository: PaymentRepository;
let customer: ICustomer;
let product: IProduct;
let perpetualProduct: IProduct;

describe('CreatePaymentService', () => {
  beforeEach(async () => {
    paymentRepository = new PaymentRepository();

    let customerRepository = new CustomerRepository();
    customer = await customerRepository.create({
      name: 'Customer One',
      email: 'customer@one.com',
      phone: '11958874800',
      stauts: 'active',
    });

    let productRepository = new ProductRepository();
    product = await productRepository.create({
      name: 'Product One',
      value: 10.99,
      payment_type: 'Monthly',
      active: 1,
    });

    perpetualProduct = await productRepository.create({
      name: 'Product Perpetual One',
      value: 10.99,
      payment_type: 'Perpetual',
      active: 1,
    });

    createPaymentService = new CreatePaymentService(paymentRepository);
  });

  it('should create a payment successfully', async () => {
    const payment = await createPaymentService.execute({
      payment_date: '2021-09-29',
      customer_id: customer.id,
      product_id: product.id,
    });

    expect(payment).toHaveProperty('id');
  });

  it('should return an error when customer not found', async () => {
    expect(
      createPaymentService.execute({
        payment_date: '2021-09-29',
        customer_id: 'customeridnotexists',
        product_id: product.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error when product not found', async () => {
    expect(
      createPaymentService.execute({
        payment_date: '2021-09-29',
        customer_id: customer.id,
        product_id: 'productidnotexists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error if the customer has already paid for the perpetual product', async () => {
    await createPaymentService.execute({
      payment_date: '2021-09-29',
      customer_id: customer.id,
      product_id: perpetualProduct.id,
    });

    expect(
      createPaymentService.execute({
        payment_date: '2021-10-29',
        customer_id: customer.id,
        product_id: perpetualProduct.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
