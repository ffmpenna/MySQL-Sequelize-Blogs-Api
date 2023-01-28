'use strict';
//Categories

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //id, name
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable('categories');
  }
};
