import boom from '@hapi/boom';

import { Category } from '../../db/models/index.js';


export default class CategoryService {
  constructor() {}

  async create(data) {
    const newCategory = await Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await Category.findByPk(id, {
      include: ['products']
    });
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    await category.update(changes);
    return category;
  }

  async delete(id) {
    const category = await this.findOne(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    await category.destroy();
    return category;
  }
}
