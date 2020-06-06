import { Request, Response } from 'express';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import CustomersRepository from '../../typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const customersRepository = new CustomersRepository();
    const createCustomerService = new CreateCustomerService(customersRepository);
    
    const {name, email} = request.body;

    const emailExists = await customersRepository.findByEmail(email);
    if(emailExists) throw new AppError("Email already exists.", 400);

    const customer = await createCustomerService.execute({
      email,
      name
    });

    return response.json(customer);
  }
}
