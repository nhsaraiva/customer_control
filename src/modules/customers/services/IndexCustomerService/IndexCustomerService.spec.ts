import IndexCustomerService from './IndexCustomerService';
import CustomerRepository from '../../infra/fake/repositories/FakeCustomerRepository';
import { ICustomer } from '../../domain/models/ICustomer';
import { Status } from '../../domain/enums/Status';
import AppError from '../../../../shared/errors/AppError';

let customerRepository: CustomerRepository;
let indexCustomerService: IndexCustomerService;

describe('IndexCustomerService', () => {
  beforeEach(async () => {
    customerRepository = new CustomerRepository();

    indexCustomerService = new IndexCustomerService(customerRepository);
  });

  it('should return one customer if has customers', async () => {
    await customerRepository.create({
      name: 'Teste Saraiva',
      email: 'teste@saraiva.com',
      phone: '5511477804185',
      status: 'active' as Status,
    });

    expect(indexCustomerService.execute()).resolves.toHaveLength(1);
  });

  it('should return void array if not has customers', async () => {
    expect(indexCustomerService.execute()).resolves.toHaveLength(0);
  });
});
