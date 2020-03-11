const Address = require('../models/Address');
const AddressType = require('../models/AddressType');
const User = require('../models/User');

module.exports = {
  async indexUser(req, res) {
    const {user_id} = req.params;

    await User.findByPk(user_id, {
      include: [
        {model: Address, as: 'addresses', required: true, include: [ {model: AddressType, as: 'address_type'}]}
      ]
    }).then(user => {
      if(!user) {
        return res.status(404).json({error: 'User not found'})
      }
      return res.json(user);
    }).catch(err => res.status(400).json({error: err.name, code: err.parent.code}));

  },

  async index(req, res) {
    const {user_id} = req.params;

    const hasUser = await User.findByPk(user_id);
    if(!hasUser) {
      return res.status(404).json({error: 'User not found'})
    }

    await Address.findAll({where: {user_id}})
      .then(addresses => res.json(addresses))
      .catch(err => res.status(400).json({error: err.name, code: err.parent.code}));

  },

  async show(req, res) {
    const {address_id} = req.params;

    await Address.findByPk(address_id).then(address => {
      if(!address) {
        return res.status(404).json({error: 'Address not found'})
      }
      return res.json(address);
    }).catch(err => res.status(400).json({error: err.name, code: err.parent.code}));
  },

  async store(req, res) {
    const {user_id} = req.params;
    const {type_id, zipcode, street, number, complement, city, state} = req.body;

    const user = await User.findByPk(user_id);

    if(!user) {
      return res.status(404).json({error: 'User not found'});
    }

    const address = await Address.create({
      user_id, 
      type_id, 
      zipcode, 
      street, 
      number, 
      complement,
      city,
      state
    });

    return res.json(address);
  },

  async update(req, res) {
    const {address_id} = req.params;

    await Address.findByPk(address_id).then(address => {
      if(!address) {
        return res.status(404).json({error: 'Address not found'})
      }

      address.update(req.body);
      return res.json(address);
    }).catch(err => res.status(400).json({error: err.name, code: err.parent.code}));
  },

  async destroy(req, res) {
    const {address_id} = req.params;

    await Address.findByPk(address_id).then(address => {
      if(!address) {
        return res.status(404).json({error: 'Address not found'})
      }
      address.destroy();
      return res.json(address);
    }).catch(err => res.status(400).json({error: err.name, code: err.parent.code}));
  },

};
