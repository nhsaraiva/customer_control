import { v4 as uuidv4 } from 'uuid';
import { Status } from '../../../domain/enums/Status';
import { ICreateCustomer } from '../../../domain/models/ICreateCustomer';
import { ICustomer } from '../../../domain/models/ICustomer';
import { ICustomerRepository } from '../../../domain/repositories/ICustomerRepository';
import FakeCustomer from '../entities/FakeCustomer';

class FakeCustomerRepository implements ICustomerRepository {
  private customers: ICustomer[] = [];

  public async create({
    name,
    email,
    phone,
    status,
  }: ICreateCustomer): Promise<ICustomer> {
    const customer = new FakeCustomer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.status = status;

    this.customers.push(customer);

    return customer;
  }

  public async findAll(): Promise<ICustomer[]> {
    return this.customers;
  }

  public async remove(id: string): Promise<void> {
    return;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  public async findById(id: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);

    return customer;
  }

  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);

    return customer;
  }

  public async findByPhone(phone: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.phone === phone);

    return customer;
  }
}

export default FakeCustomerRepository;
