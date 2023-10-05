import boom from '@hapi/boom';

import { OrderDetail, OrderDate, Product, User } from '../../db/models/index.js';

export default class OrderDetailService {
  constructor() {}

  async create(data) {
    const { clientId, products } = data;

    const user = await User.findOne({ where: { id: clientId }});
    if(!user) {
      throw boom.notFound('User not found');
    }
    
    const newOrderDate = await OrderDate.create({ userId: clientId });

    const newOrderDetails = await Promise.all(products.map(async (product) => {
      const { productId, quantity } = product;
      const selectedProduct = await Product.findOne({ where: { productId: productId }});
      if(!selectedProduct) {
        throw boom.notFound('Product not found');
      }
      if(selectedProduct.stock < quantity) {
        throw boom.badRequest('There is not enough stock');
      }
      const price = multi(selectedProduct.price * quantity);

      const newOrderDetail = await OrderDetail.create({
        orderDateId: newOrderDate.id,
        productId: selectedProduct.productId,
        quantity: quantity,
        price: price,
      });

      const newStock = selectedProduct.stock - quantity;
      await selectedProduct.update({ stock: newStock });

      return newOrderDetail;
    }))
    console.log(user.addressId);
    const totalPrice = newOrderDetails.reduce((total, orderDetail) => total + orderDetail.price, 0);
    await newOrderDate.update({ totalPrice: totalPrice, addressId: user.addressId });
    return { newOrderDetails, totalPrice };
  }

  async find() {
    const response = await OrderDetail.findAll();
    return response;
  }

  async findOne(id) {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) {
      throw boom.notFound('OrderDetail not found');
    }
    return orderDetail;
  }

  async update(id, changes) {
    const orderDetail = await this.findOne(id);
    const response = await orderDetail.update(changes);
    return response;
  }

  async delete(id) {
    const orderDetail = await this.findOne(id);
    await orderDetail.destroy();
    return { id };
  }
}

const multi = (a, b) => {
  return a * b;
}

export { multi };