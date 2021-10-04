import { IPaymentRepository } from '../../../../modules/payments/domain/repositories/IPaymentRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shared/errors/AppError';
import { IDeleteCustomer } from '../../domain/models/IDeleteCustomer';
import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private repository: ICustomerRepository,
    @inject('PaymentRepository')
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
