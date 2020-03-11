const {Model, DataTypes} = require('sequelize');

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
        complement: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
    this.belongsTo(models.AddressType, {foreignKey: 'type_id', as: 'address_type'});
  }
}

module.exports = Address;
