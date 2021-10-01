import { ICustomer } from '../../domain/models/ICustomer';
import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';

class IndexCustomerService {
  constructor(private repository: ICustomerRepository) {}

  public async execute(): Promise<ICustomer[]> {
    const customers = await this.repository.findAll();

    return customers;
  }
}
export default IndexCustomerService;
