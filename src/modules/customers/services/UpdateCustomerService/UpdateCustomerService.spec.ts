import 'reflect-metadata';
import UpdateCustomerService from './UpdateCustomerService';
import CustomerRepository from '../../infra/fake/repositories/FakeCustomerRepository';
import { ICustomer } from '../../domain/models/ICustomer';
import AppError from '../../../../shared/errors/AppError';
import { Status } from '../../domain/enums/Status';

let customerRepository: CustomerRepository;
let updateCustomerService: UpdateCustomerService;
let customerCreated: ICustomer;

describe('UpdateCustomerService', () => {
  beforeEach(async () => {
    customerRepository = new CustomerRepository();

    customerCreated = await customerRepository.create({
      name: 'Customer One',
      email: 'teste@saraiva.com',
      phone: '551195587400',
      status: 'active' as Status,
    });

    await customerRepository.create({
      name: 'Customer Two',
      email: 'teste2@saraiva.com',
      phone: '551195587401',
      status: 'active' as Status,
    });

    updateCustomerService = new UpdateCustomerService(customerRepository);
  });

  it('should return updated customer if email not exists in another customers', async () => {
    let updatedCustomer = await updateCustomerService.execute({
      id: customerCreated.id,
      name: 'Customer One Updated',
      email: 'teste3@saraiva.com',
      phone: '551195587400',
      status: 'active' as Status,
    });

    expect(await customerRepository.findById(customerCreated.id)).toMatchObject(
      updatedCustomer,
    );
  });

  it('should return error if customer not exists', async () => {
    expect(
      updateCustomerService.execute({
        id: 'idnotexists',
        name: 'Customer One',
        email: 'teste@saraiva.com',
        phone: '551195587400',
        status: 'active' as Status,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error if status customer not is valid', async () => {
    expect(
      updateCustomerService.execute({
        id: customerCreated.id,
        name: 'Customer One Updated',
        email: 'teste@saraiva.com',
        phone: '551195587400',
        status: 'actives' as Status,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error if email exists in another customers', async () => {
    expect(
      updateCustomerService.execute({
        id: customerCreated.id,
        name: 'Customer Two',
        email: 'teste2@saraiva.com',
        phone: '551195587400',
        status: 'active' as Status,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error if phone exists in another customers', async () => {
    expect(
      updateCustomerService.execute({
        id: customerCreated.id,
        name: 'Customer Two',
        email: 'teste@saraiva.com',
        phone: '551195587401',
        status: 'active' as Status,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
