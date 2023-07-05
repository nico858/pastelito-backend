import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
// import { DataRowMessage } from 'pg-protocol/dist/messages';

import { User } from '../../db/models/index.js';

export default class UserService {
  constructor() {}

  async create(data,) {
    const hash = await bcrypt.hash(data.userPassword, 10);
    const newUser = await User.create({
      ...data,
      userPassword: hash,
      include: ['address']
    });
    return newUser;
  }

  async find() {
    const response = await User.findAll({
      include: ['address']
    });
    return response;
  }

  async findByUsername(username) {
    const response = await User.findOne({
      where: { username }
    });
    return response;
  }

  async findByEmail(email) {
    const response = await User.findOne({
      where: { email }
    });
    return response;
  }

  async findOne(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
