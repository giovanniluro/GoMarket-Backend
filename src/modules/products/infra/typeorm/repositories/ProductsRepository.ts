import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';
import AppError from '@shared/errors/AppError';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({ name, price, quantity }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name
      }
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const foundProducts: Product[] = [];

    for (const product of products) {
      const foundProduct = await this.ormRepository.findOne({
        where: {
          id: product.id
        }
      });

      if (!foundProduct) throw new AppError(`Product ${product.id} not found`);
      foundProducts.push(foundProduct);
    };

    return foundProducts;
  }

  public async updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]> {
    const updatedProducts: Product[] = [];

    for(const product of products) {
      const foundProduct = await this.ormRepository.findOne({
        where: {
          id: product.id
        }
      });

      if (foundProduct) {
        foundProduct.quantity = foundProduct.quantity - product.quantity;
        await this.ormRepository.save(foundProduct);
        updatedProducts.push(foundProduct);
      }
    };

    return updatedProducts;
  }
}

export default ProductsRepository;
