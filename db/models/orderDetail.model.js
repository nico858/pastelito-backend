export const OrderDetailModel = (connection, DataTypes) => {
  return connection.define('OrderDetail', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'order_detail_id'
    },
    orderDateId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'order_date_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'product_id',
      onUpdate: 'SET NULL',
      onDelete: 'CASCADE'
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  })
}