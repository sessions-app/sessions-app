'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'payload', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropColumn('Users', 'payload');
  }
};
