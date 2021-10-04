import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shared/errors/AppError';
import { IDeletePayment } from '../../domain/models/IDeletePayment';
import { IPaymentRepository } from '../../domain/repositories/IPaymentRepository';

@injectable()
class DeletePaymentService {
  constructor(
    @inject('PaymentRepository')
    private repository: IPaymentRepository,
  ) {}

  public async execute({ id }: IDeletePayment): Promise<void> {
    const payment = await this.repository.findById(id);

    if (!payment) {
      throw new AppError('Payment not found');
    }

    await this.repository.remove(id);
  }
}
export default DeletePaymentService;
