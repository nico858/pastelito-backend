import { Sequelize } from 'sequelize';

import connection from "../database.js";
import { AddressModel } from "./address.model.js";
import { CategoryModel } from "./category.model.js";
import { OrderDateModel } from "./orderDate.model.js";
import { OrderDetailModel } from "./orderDetail.model.js";
import { ProductModel } from "./product.model.js";
import { UserModel } from "./user.model.js";


export const Address = AddressModel(connection, Sequelize);
export const OrderDate = OrderDateModel(connection, Sequelize);
export const OrderDetail = OrderDetailModel(connection, Sequelize);
export const Product = ProductModel(connection, Sequelize);
export const User = UserModel(connection, Sequelize);


User.hasOne(Address, { as: 'address', foreignKey: 'userId' });
Address.hasOne(User, { as: 'user', foreignKey: 'addressId' });

User.hasMany(OrderDate, { as: 'orders', foreignKey: 'userId' });
OrderDate.belongsTo(User, {  as: 'user', foreignKey: 'userId' });

Product.belongsToMany(OrderDate, { as: 'items', through: OrderDetail, foreignKey: 'productId', otherKey: 'orderDateId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
OrderDate.belongsToMany(Product, { as: 'orders', through: OrderDetail, foreignKey: 'orderDateId', otherKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

OrderDetail.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
OrderDetail.belongsTo(OrderDate, { foreignKey: 'orderDateId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


connection.sync({ alter: true });


