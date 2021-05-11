'use strict';

const { getCurrentDate } = require("../helpers");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const listProducts = ['Logam Mulia 1 gr', 'Logam Mulia 2 gr', 'Logam Mulia 3 gr', 'Logam Mulia 5 gr']
    const dataProducts = listProducts.map((product, index) => {
      let initial_price = (index === listProducts.length - 1) ? (9e5 * (index + 2)) : (9e5 * (index + 1))
      let temp = {
        name: product,
        stock: 150 - (25 * index),
        initial_price,
        discount: 0,
        total_price: initial_price,
        status: '1',
        create_by: 'admin',
        create_date: getCurrentDate()
      }
      return temp
    })
    await queryInterface.bulkInsert('Products', dataProducts, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {})
  }
};
