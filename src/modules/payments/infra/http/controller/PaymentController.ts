import { Request, Response } from 'express';

class PaymentController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ testeCreate: true });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json({ testeDelete: true });
  }
}

export default PaymentController;
