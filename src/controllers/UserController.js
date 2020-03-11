const Yup = require('yup');
const {Op} = require('sequelize');

const User = require('../models/User');


module.exports = {
  async filterByName(req, res) {
    const {first_name} = req.query;

    const users = await User.findAll({
      where: {
        'first_name': {
          [Op.iLike]: `%${first_name}%`
        }
      }
    });

    return res.json(users); 
  },

  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async show(req, res) {
    const {user_id} = req.params;

    await User.findByPk(user_id).then(user => {
      if(!user) {
        return res.status(404).json({error: 'User not found'})
      }
      return res.json(user);
    }).catch(err => res.status(400).json({error: err.name, code: err.parent.code}));
  },


  async store(req, res) {
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      cpf: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().required(),
      cellphone: Yup.string().required(),
      addresses: Yup.array(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {first_name, last_name, cpf, email, phone, cellphone, addresses} = req.body;

    const hasUser = await User.findOne({where: {cpf: cpf}});
    if (hasUser) {
      return res.status(409).json({error: 'User already registered with this cpf'})
    }

    const user = await User.create({
      first_name, 
      last_name, 
      cpf, 
      email, 
      phone, 
      cellphone,
      addresses: 
        addresses.map(address => (
          {
            "type_id": address.type_id, 
            "zipcode": address.zipcode, 
            "street": address.street, 
            "number": address.number, 
            "complement": address.complement,
            "city": address.city,
            "state": address.state
          }
        ))
    }, {
      include: [{
        association: 'addresses',
      }]
    });

    return res.json(user);
  },

  async update(req, res) {
    const {user_id} = req.params;
    const {first_name, last_name, email, phone, cellphone} = req.body; 

    await User.findByPk(user_id).then(user => {
      if(!user) {
        return res.status(404).json({error: 'User not found'})
      }

      user.update({
        first_name,
        last_name,
        email,
        phone,
        cellphone
      });

      return res.json(user);
    }).catch(err => res.status(400).json({error: err.name, code: err.parent.code}));
  },

  async destroy(req, res) {
    const {user_id} = req.params;

    await User.findByPk(user_id).then(user => {
      if(!user) {
        return res.status(404).json({error: 'User not found'})
      }
      user.destroy();
      return res.json(user);
    }).catch(err => res.status(400).json({error: err.name, code: err.parent.code}));
  },

};
