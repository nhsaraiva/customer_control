import { Request, Response } from 'express';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json({ testeIndex: true });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ testeCreate: true });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    return response.json({ testeShow: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ testeUpdate: true });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json({ testeDelete: true });
  }
}

export default UserController;
