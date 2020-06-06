import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {

  constructor(
    private ordersRepository: IOrdersRepository,
    private productsRepository: IProductsRepository,
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    
    const customer = await this.customersRepository.findById(customer_id);
    if(!customer) throw new AppError("Customer not found.");

    const productsFound = await this.productsRepository.findAllById(products);

    const order_products = products.map(product => {

      const foundProduct = productsFound.find(produto => produto.id === product.id);

      if(foundProduct){
        if(foundProduct.quantity < product.quantity) throw new AppError(`Product ${product.id} is unavailable`);
      }

      return {
        product_id: product.id,
        quantity: product.quantity,
        price: foundProduct?.price || 0
      }
    });

    const order = await this.ordersRepository.create({
      customer,
      products: order_products
    });

    await this.productsRepository.updateQuantity(products);

    delete order.customer_id;

    return order;
  }
}

export default CreateOrderService;
