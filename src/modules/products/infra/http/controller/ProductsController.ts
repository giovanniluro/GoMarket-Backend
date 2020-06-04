import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import ProductsRepository from '../../typeorm/repositories/ProductsRepository';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const productRepository = new ProductsRepository();
    const createProductService = new CreateProductService(productRepository);
    const { name, price, quantity } = request.body;

    const product = await createProductService.execute({
      name,
      price,
      quantity
    });

    return response.json(product);
  }
}
