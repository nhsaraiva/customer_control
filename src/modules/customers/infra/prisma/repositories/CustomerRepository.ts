import { PrismaClient } from '@prisma/client';
import { Status } from '../../../domain/enums/Status';
import { ICreateCustomer } from '../../../domain/models/ICreateCustomer';
import { ICustomer } from '../../../domain/models/ICustomer';
import { ICustomerRepository } from '../../../domain/repositories/ICustomerRepository';
import Customer from '../models/Customer';

class CustomerRepository implements ICustomerRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async findById(id: string): Promise<ICustomer | undefined> {
    const customerFind = await this.client.customer.findFirst({
      where: {
        id,
      },
    });

    if (!customerFind) {
      return undefined;
    }

    const { name, email, phone, status } = customerFind;

    const customer = new Customer(id, name, email, phone, status as Status);

    return customer;
  }

  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    const customerFind = await this.client.customer.findFirst({
      where: {
        email,
      },
    });

    if (!customerFind) {
      return undefined;
    }

    const { id, name, phone, status } = customerFind;

    const customer = new Customer(id, name, email, phone, status as Status);

    return customer;
  }

  public async findByPhone(phone: string): Promise<ICustomer | undefined> {
    const customerFind = await this.client.customer.findFirst({
      where: {
        phone,
      },
    });

    if (!customerFind) {
      return undefined;
    }

    const { id, name, email, status } = customerFind;

    const customer = new Customer(id, name, email, phone, status as Status);

    return customer;
  }

  public async findAll(): Promise<ICustomer[]> {
    const customers: Customer[] = [];

    const customersFind = await this.client.customer.findMany();

    customersFind.forEach(customerFind => {
      var { id, name, email, phone, status } = customerFind;

      var customer = new Customer(id, name, email, phone, status as Status);

      customers.push(customer);
    });

    return customers;
  }

  public async create({
    name,
    email,
    phone,
    status,
  }: ICreateCustomer): Promise<ICustomer> {
    const customerCreated = await this.client.customer.create({
      data: {
        name,
        email,
        phone,
        status,
      },
    });

    const customer = new Customer(
      customerCreated.id,
      customerCreated.name,
      customerCreated.email,
      customerCreated.phone,
      customerCreated.status as Status,
    );

    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    const customerUpdated = await this.client.customer.update({
      where: {
        id: customer.id,
      },
      data: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        status: customer.status,
      },
    });

    const customerSaved = new Customer(
      customerUpdated.id,
      customerUpdated.name,
      customerUpdated.email,
      customerUpdated.phone,
      customerUpdated.status as Status,
    );

    return customerSaved;
  }

  public async remove(id: string): Promise<void> {
    await this.client.customer.delete({
      where: {
        id,
      },
    });
  }
}

export default CustomerRepository;
