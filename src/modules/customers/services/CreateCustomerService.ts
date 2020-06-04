import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const emailExists = await this.customersRepository.findByEmail(email);
    
    if(emailExists) throw new AppError("This email already exists.");

    const customer = await this.customersRepository.create({
      name,
      email
    });

    return customer;
  }
}

export default CreateCustomerService;
