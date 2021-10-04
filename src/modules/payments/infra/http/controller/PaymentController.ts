import { Request, Response } from 'express';
import CreatePaymentService from '../../../services/CreatePaymentService/CreatePaymentService';
import DeletePaymentService from '../../../services/DeletePaymentService/DeletePaymentService';
import { container } from 'tsyringe';

class PaymentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { payment_date, customer_id, product_id } = request.body;

    const createPaymentService = container.resolve(CreatePaymentService);

    const payment = await createPaymentService.execute({
      payment_date,
      customer_id,
      product_id,
    });

    return response.json(payment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePaymentService = container.resolve(DeletePaymentService);

    await deletePaymentService.execute({ id });

    return response.json([]);
  }
}

export default PaymentController;
