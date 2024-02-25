'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'userRole', {
      type: Sequelize.ENUM('admin', 'user'), // Add your role options here
      allowNull: false,
      defaultValue: 'user' // Set default role as 'user'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'userRole');
  }
};
