import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shared/errors/AppError';
import { Status } from '../../domain/enums/Status';
import { ICreateCustomer } from '../../domain/models/ICreateCustomer';
import { ICustomer } from '../../domain/models/ICustomer';
import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private repository: ICustomerRepository,
  ) {}

  public async execute({
    name,
    email,
    phone,
    status,
  }: ICreateCustomer): Promise<ICustomer> {
    if (!Object.values(Status).includes(status as Status)) {
      throw new AppError('Type is not valid');
    }

    const emailExists = await this.repository.findByEmail(email);

    if (emailExists) {
      throw new AppError('The email exists is in other customer');
    }

    const phoneExists = await this.repository.findByPhone(phone);

    if (phoneExists) {
      throw new AppError('The phone exists is in other customer');
    }

    const customer = await this.repository.create({
      name,
      email,
      phone,
      status,
    });

    return customer;
  }
}

export default CreateCustomerService;
