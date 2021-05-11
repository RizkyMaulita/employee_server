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
    const listPositions = ['CEO', 'COO', 'CTO', 'CMO', 'Product Manager', 'Engineer', 'Staff', 'Sales', 'Intern']
    const dataPositions = listPositions.map(position => {
      let temp = {
        name: position,
        status: '1',
        create_by: 'admin',
        create_date: getCurrentDate()
      }
      return temp
    })
    await queryInterface.bulkInsert('Positions', dataPositions, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Positions', null, {})
  }
};
