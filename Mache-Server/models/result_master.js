const Sequelize = require('sequelize');
const db = require('../db');


const resultMaster = db.define('result_master', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  _room_unique_id: {
    type: Sequelize.STRING
  },
  _room_id: {
    type: Sequelize.INTEGER
  },
  _user_id: {
    type: Sequelize.INTEGER
  },
  points: {
    type: Sequelize.INTEGER
  },
  round: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  next_game_status: {
    type: Sequelize.STRING(15),
    defaultValue: 'waiting'
}
});


module.exports = {
  resultMaster
}






