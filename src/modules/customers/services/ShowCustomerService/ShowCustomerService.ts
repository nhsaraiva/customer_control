import AppError from '../../../../shared/errors/AppError';
import { IShowCustomer } from '../../domain/models/IShowCustomer';
import { ICustomer } from '../../domain/models/ICustomer';
import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomerRepository')
    private repository: ICustomerRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<ICustomer> {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
