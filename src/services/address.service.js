import boom from '@hapi/boom';

import { Address } from '../../db/models/index.js';

export default class AddressService {
  constructor() {}

  async create(data) {
    const newAddress = await Address.create(data);
    return newAddress;
  }

  async find() {
    const response = await AddressSchema.findAll();
    return response;
  }

  async findOne(id) {
    const address = await AddressSchema.findByPk(id);
    if (!address) {
      throw boom.notFound('Address not found');
    }
    return address;
  }

  async update(id, changes) {
    const address = await this.findOne(id);
    const response = await address.update(changes);
    return response;
  }

  async delete(id) {
    const address = await this.findOne(id);
    await address.destroy();
    return { id };
  }
}

