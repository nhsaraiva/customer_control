import 'reflect-metadata';
import DeleteCustomerService from './DeleteCustomerService';
import CustomerRepository from '../../infra/fake/repositories/FakeCustomerRepository';
import PaymentRepository from '../../../payments/infra/fake/repositories/FakePaymentRepository';
import { ICustomer } from '../../domain/models/ICustomer';
import AppError from '../../../../shared/errors/AppError';
import { Status } from '../../domain/enums/Status';
import ProductRepository from '../../../products/infra/fake/repositories/FakeProductRepository';
import { Type } from '../../../products/domain/enums/Type';

let customerRepository: CustomerRepository;
let deleteCustomerService: DeleteCustomerService;
let customerCreated: ICustomer;
let paymentRepository: PaymentRepository;

describe('DeleteCustomerService', () => {
  beforeEach(async () => {
    customerRepository = new CustomerRepository();

    customerCreated = await customerRepository.create({
      name: 'Teste Saraiva',
      email: 'teste@saraiva.com',
      phone: '5511987450145',
      status: 'active' as Status,
    });

    paymentRepository = new PaymentRepository();

    deleteCustomerService = new DeleteCustomerService(
      customerRepository,
      paymentRepository,
    );
  });

  it('should return void if customer deleted', async () => {
    expect(
      deleteCustomerService.execute({
        id: customerCreated.id,
      }),
    ).resolves.toBeUndefined();
  });

  it('should return error if customer not exists', async () => {
    expect(
      deleteCustomerService.execute({
        id: 'idnotexists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error if customer has payment', async () => {
    let productRepository = new ProductRepository();
    let product = await productRepository.create({
      name: 'Product One',
      value: 10.99,
      type: 'monthly' as Type,
      active: true,
    });

    await paymentRepository.create({
      payment_date: '2021-10-01',
      customer_id: customerCreated.id,
      product_id: product.id,
    });

    deleteCustomerService = new DeleteCustomerService(
      customerRepository,
      paymentRepository,
    );

    expect(
      deleteCustomerService.execute({
        id: customerCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
