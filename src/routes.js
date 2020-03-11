const express = require('express');

const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const AddressTypesController = require('./controllers/AddressTypesController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({
    message: 'Send get to /users to get list of users',
  })
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/user', UserController.filterByName);

routes.get('/users/:user_id', UserController.show);
routes.patch('/users/:user_id', UserController.update);
routes.put('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.destroy);

routes.get('/users/:user_id/address', AddressController.index);
routes.post('/users/:user_id/address', AddressController.store);

routes.get('/address/types', AddressTypesController.index);

routes.get('/address/:address_id', AddressController.show);
routes.patch('/address/:address_id', AddressController.update);
routes.put('/address/:address_id', AddressController.update);
routes.delete('/address/:address_id', AddressController.destroy);

module.exports = routes;
