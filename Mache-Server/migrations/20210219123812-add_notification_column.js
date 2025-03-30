'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('app_users_masters', 'is_friend_request_allow', {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: 'true',
        }, { transaction: t }),
        queryInterface.addColumn('app_users_masters', 'is_game_invitation_allow', {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: 'true',
        }, { transaction: t }),
        queryInterface.addColumn('app_users_masters', 'is_leaderboards_allow', {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: 'true',
        }, { transaction: t }),
        queryInterface.addColumn('app_users_masters', 'is_sound_effect_allow', {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: 'true',
        }, { transaction: t }),
        queryInterface.addColumn('app_users_masters', 'is_background_music_allow', {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: 'true',
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('app_users_masters', 'is_friend_request_allow', { transaction: t }),
        queryInterface.removeColumn('app_users_masters', 'is_game_invitation_allow', { transaction: t }),
        queryInterface.removeColumn('app_users_masters', 'is_leaderboards_allow', { transaction: t }),
        queryInterface.removeColumn('app_users_masters', 'is_sound_effect_allow', { transaction: t }),
        queryInterface.removeColumn('app_users_masters', 'is_background_music_allow', { transaction: t })
      ]);
    });
  }
};
