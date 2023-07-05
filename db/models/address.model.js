export const AddressModel = (connection, DataTypes) => {
  return connection.define('Address', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id',
      unique: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    nomecature: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  })
}

