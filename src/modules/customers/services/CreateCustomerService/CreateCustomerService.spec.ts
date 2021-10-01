import CustomerRepository from '../../infra/fake/repositories/FakeCustomerRepository';
import AppError from '../../../../shared/errors/AppError';
import CreateCustomerService from './CreateCustomerService';
import HashProvider from '../../../../shared/infra/fakes/FakeHashProvider';
import { Status } from '../../domain/enums/Status';

let createCustomerService: CreateCustomerService;
let customerRepository: CustomerRepository;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    customerRepository = new CustomerRepository();

    createCustomerService = new CreateCustomerService(customerRepository);
  });

  it('should create a customer successfully', async () => {
    const customer = await createCustomerService.execute({
      name: 'Teste Saraiva',
      email: 'teste@saraiva.com',
      phone: '551195587400',
      status: 'active' as Status,
    });

    expect(customer).toHaveProperty('id');
  });

  it('should return an error when creating two customers with the same email', async () => {
    await createCustomerService.execute({
      name: 'Teste Saraiva 2',
      email: 'teste2@saraiva.com',
      phone: '551195587400',
      status: 'active' as Status,
    });

    expect(
      createCustomerService.execute({
        name: 'Teste Saraiva 3',
        email: 'teste2@saraiva.com',
        phone: '551195587401',
        status: 'active' as Status,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error when creating two customers with the same phone', async () => {
    await createCustomerService.execute({
      name: 'Teste Saraiva 2',
      email: 'teste2@saraiva.com',
      phone: '551195587400',
      status: 'active' as Status,
    });

    expect(
      createCustomerService.execute({
        name: 'Teste Saraiva 3',
        email: 'teste3@saraiva.com',
        phone: '551195587400',
        status: 'active' as Status,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error if status is invalid', async () => {
    expect(
      createCustomerService.execute({
        name: 'Teste Saraiva 3',
        email: 'teste3@saraiva.com',
        phone: '551195587400',
        status: 'actives' as Status,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
