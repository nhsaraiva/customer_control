import AppError from '../../../../shared/errors/AppError';
import { IUpdateCustomer } from '../../domain/models/IUpdateCustomer';
import { ICustomer } from '../../domain/models/ICustomer';
import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { Status } from '../../domain/enums/Status';

class UpdateCustomerService {
  constructor(private repository: ICustomerRepository) {}

  public async execute({
    id,
    name,
    email,
    phone,
    status,
  }: IUpdateCustomer): Promise<ICustomer> {
    if (!Object.values(Status).includes(status as Status)) {
      throw new AppError('Type is not valid');
    }

    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerHasThisEmail = await this.repository.findByEmail(email);

    if (customerHasThisEmail && customerHasThisEmail.id != customer.id) {
      throw new AppError('Email already exists to antoher customer');
    }

    const customerHasThisPhone = await this.repository.findByPhone(phone);

    if (customerHasThisPhone && customerHasThisPhone.id != customer.id) {
      throw new AppError('Phone already exists to antoher customer');
    }

    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.status = status;

    await this.repository.save(customer);

    return customer;
  }
}
export default UpdateCustomerService;
