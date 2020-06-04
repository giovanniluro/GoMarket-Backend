import { Request, Response } from 'express';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import CustomersRepository from '../../typeorm/repositories/CustomersRepository';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const customersRepository = new CustomersRepository();
    const createCustomerService = new CreateCustomerService(customersRepository);
    
    const {name, email} = request.body;

    const customer = await createCustomerService.execute({
      email,
      name
    });

    return response.json(customer);
  }
}
