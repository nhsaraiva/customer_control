import { IPaymentRepository } from 'src/modules/payments/domain/repositories/IPaymentRepository';
import AppError from '../../../../shared/errors/AppError';
import { IDeleteCustomer } from '../../domain/models/IDeleteCustomer';
import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';

class DeleteCustomerService {
  constructor(
    private repository: ICustomerRepository,
    private paymentRepository: IPaymentRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const payments = await this.paymentRepository.findByCustomerId(id);

    if (payments) {
      throw new AppError('Customer has payments');
    }

    await this.repository.remove(customer.id);
  }
}

export default DeleteCustomerService;
