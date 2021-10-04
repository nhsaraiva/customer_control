import { Request, Response } from 'express';
import CreateProductService from 'src/modules/products/services/CreateProductService/CreateProductService';
import DeleteProductService from 'src/modules/products/services/DeleteProductService/DeleteProductService';
import IndexProductService from 'src/modules/products/services/IndexProductService/IndexProductService';
import ShowProductService from 'src/modules/products/services/ShowProductService/ShowProductService';
import UpdateProductService from 'src/modules/products/services/UpdateProductService/UpdateProductService';
import { container } from 'tsyringe';

class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexProductService = container.resolve(IndexProductService);

    const products = await indexProductService.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, value, type } = request.body;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute({
      name,
      value,
      type,
    });

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProductService = container.resolve(ShowProductService);

    const product = await showProductService.execute({ id });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, value, type, active } = request.body;

    const createProductService = container.resolve(UpdateProductService);

    const product = await createProductService.execute({
      id,
      name,
      value,
      type,
      active,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);

    const product = await deleteProductService.execute({
      id,
    });

    return response.json(product);
  }
}

export default ProductController;
