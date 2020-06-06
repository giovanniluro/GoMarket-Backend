import { Request, Response } from 'express';


import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import OrdersRepository from '../../typeorm/repositories/OrdersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';

export default class OrdersController {

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const productsRepository = new ProductsRepository();
    const ordersRepository = new OrdersRepository();
    const custumersRepository = new CustomersRepository();
    const findOrderService = new FindOrderService(ordersRepository, productsRepository, custumersRepository);

    const order = await findOrderService.execute({
      id
    });

    if(!order) throw new AppError("No order found.");

    delete order.customer_id;

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;
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
