import { Request, Response } from 'express';
import CreateSessionService from 'src/modules/users/services/CreateSessionService/CreateSessionService';
import { container } from 'tsyringe';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = container.resolve(CreateSessionService);

    const session = await createSessionService.execute({ email, password });

    return response.json(session);
  }
}

export default SessionController;
