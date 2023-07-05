import boom from '@hapi/boom';

import { OrderDate } from '../../db/models/index.js';

export default class OrderDateService {
  constructor() {}

  async create(data) {
    const newOrderDate = await OrderDate.create(data);
    return newOrderDate;
  }

  async find() {
    const response = await OrderDate.findAll();
    return response;
  }

  async findByUser(userId) {
    const orders = await OrderDate.findByPk(id , {
      where: {
        'customer.user.id$': userId
      },
      include: [
        {
          association: 'user',
          include: ['user']
        }
      ]
    });
    return orders;
  }

  async findOne(id) {
    const orderDate = await OrderDate.findByPk(id);
    if (!orderDate) {
      throw boom.notFound('OrderDate not found');
    }
    return orderDate;
  }

  async findByUser(userId) {
    const response = await OrderDate.findAll({
      where: { userId: userId }
    });
    return response;
  }

  async update(id, changes) {
    const orderDate = await this.findOne(id);
    const response = await orderDate.update(changes);
    return response;
  }

  async delete(id) {
    const orderDate = await this.findOne(id);
    await orderDate.destroy();
    return { id };
  }
}
