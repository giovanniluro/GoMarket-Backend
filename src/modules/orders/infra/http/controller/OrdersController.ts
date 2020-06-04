import { Request, Response } from 'express';


import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import OrdersRepository from '../../typeorm/repositories/OrdersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    // TODO
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {customer_id, products} = request.body;
    const productsRepository = new ProductsRepository();
    const ordersRepository = new OrdersRepository();
    const custumersRepository = new CustomersRepository();
    const createOrderService = new CreateOrderService(ordersRepository, productsRepository, custumersRepository);

    const order = await createOrderService.execute({
      customer_id,
      products
    });

    return response.json(order);
  }
}
