'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payment_historie', {
      payment_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      _user_id:{
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'app_users_masters', key: 'user_id' }
      },
      _diamond_package_id:{
        type: Sequelize.DataTypes.INTEGER
      },
      diamond_name:{
        type: Sequelize.DataTypes.STRING
      },
      total_amount:{
        type: Sequelize.DataTypes.STRING
      },
      diamond_quantity:{
        type: Sequelize.DataTypes.STRING
      },
      is_delete:{
        type: Sequelize.DataTypes.INTEGER
      },
      status:{
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'active'
      },
      createdAt:{
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      is_vip:{
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      },
      stars_amount:{
        type: Sequelize.DataTypes.INTEGER
      }
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payment_historie');
  }
};
