import ShowCustomerService from './ShowCustomerService';
import CustomerRepository from '../../infra/fake/repositories/FakeCustomerRepository';
import { ICustomer } from '../../domain/models/ICustomer';
import AppError from '../../../../shared/errors/AppError';
import { Status } from '../../domain/enums/Status';

let customerRepository: CustomerRepository;
let showCustomerService: ShowCustomerService;
let customerCreated: ICustomer;

describe('ShowCustomerService', () => {
  beforeEach(async () => {
    customerRepository = new CustomerRepository();

    customerCreated = await customerRepository.create({
      name: 'Teste Saraiva',
      email: 'teste@email.com',
      phone: '5511477804185',
      status: 'active' as Status,
    });

    showCustomerService = new ShowCustomerService(customerRepository);
  });

  it('should return success if customer exists', async () => {
    const customer = await showCustomerService.execute({
      id: customerCreated.id,
    });

    expect(customer).toHaveProperty('id');
  });

  it('should return an error if customer not exists', async () => {
    expect(
      showCustomerService.execute({
        id: 'idnotexists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
