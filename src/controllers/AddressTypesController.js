const AddressType = require('../models/AddressType');

module.exports = {
  async index(req, res) {

    const AddressTypes = await AddressType.findAll({
      attributes: ['id', 'description']
    });

    return res.json(AddressTypes);
  }
};
