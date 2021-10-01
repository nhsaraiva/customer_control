import { Request, Response } from 'express';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ testeCreate: true });
  }
}

export default SessionController;
