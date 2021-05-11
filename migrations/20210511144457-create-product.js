'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      initial_price: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('0','1','2')
      },
      create_by: {
        type: Sequelize.STRING
      },
      create_date: {
        type: Sequelize.DATE
      },
      update_by: {
        type: Sequelize.STRING
      },
      update_date: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};