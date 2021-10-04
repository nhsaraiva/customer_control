import { Request, Response } from 'express';
import CreateCustomerService from 'src/modules/customers/services/CreateCustomerService/CreateCustomerService';
import DeleteCustomerService from 'src/modules/customers/services/DeleteCustomerService/DeleteCustomerService';
import IndexCustomerService from 'src/modules/customers/services/IndexCustomerService/IndexCustomerService';
import ShowCustomerService from 'src/modules/customers/services/ShowCustomerService/ShowCustomerService';
import UpdateCustomerService from 'src/modules/customers/services/UpdateCustomerService/UpdateCustomerService';
import { container } from 'tsyringe';

class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexCustomerService = container.resolve(IndexCustomerService);

    const products = await indexCustomerService.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, status } = request.body;

    const createProductService = container.resolve(CreateCustomerService);

    const product = await createProductService.execute({
      name,
      email,
      phone,
      status,
    });

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = container.resolve(ShowCustomerService);

    const customer = await showCustomerService.execute({ id });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, email, phone, status } = request.body;

    const updateCustomerService = container.resolve(UpdateCustomerService);

    const customer = await updateCustomerService.execute({
      id,
      name,
      email,
      phone,
      status,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = container.resolve(DeleteCustomerService);

    await deleteCustomerService.execute({ id });

    return response.json([]);
  }
}

export default CustomerController;
