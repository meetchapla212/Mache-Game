'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('result_masters', 'next_game_status', {
          type: Sequelize.DataTypes.STRING,
          defaultValue: 'waiting'
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('result_masters', 'next_game_status', { transaction: t })
      ]);
    });
  }
};
