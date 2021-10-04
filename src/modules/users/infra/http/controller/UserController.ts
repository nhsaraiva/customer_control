import { Request, Response } from 'express';
import CreateUserService from 'src/modules/users/services/CreateUserService/CreateUserService';
import DeleteUserService from 'src/modules/users/services/DeleteUserService/DeleteUserService';
import IndexUserService from 'src/modules/users/services/IndexUserService/IndexUserService';
import ShowUserService from 'src/modules/users/services/ShowUserService/ShowUserService';
import UpdateUserService from 'src/modules/users/services/UpdateUserService/UpdateUserService';
import { container } from 'tsyringe';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexUserService = container.resolve(IndexUserService);

    const users = await indexUserService.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({ id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, email, password, old_password } = request.body;

    const createUserService = container.resolve(UpdateUserService);

    const user = await createUserService.execute({
      id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({
      id,
    });

    return response.json([]);
  }
}

export default UserController;
