'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('address_types', [
      {
        description: 'Residencial',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Comercial',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Cobrança',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Entrega',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
