const {Model, DataTypes} = require('sequelize');

class AddressType extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(models.Address, {foreignKey: 'type_id', as: 'addresses'});
  }
}

module.exports = AddressType;
