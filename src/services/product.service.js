import boom from '@hapi/boom';

import { Product } from '../../db/models/index.js';

export default class ProductsService {

  async create(data) {
    const newProduct = await Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await Product.findAll();
    return products;
  }

  async findOne(id) {
    //const product = this.products.find(item => item.productId === id); //para buscar si se usa fakerz||
    const product = await Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}
