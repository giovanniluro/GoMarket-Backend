import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {

    const productExists = await this.productsRepository.findByName(name);

    if(productExists) throw new Error("That product already exists.");
    
    const product = this.productsRepository.create({
      name,
      price,
      quantity
    });

    return product;
  }
}

export default CreateProductService;
