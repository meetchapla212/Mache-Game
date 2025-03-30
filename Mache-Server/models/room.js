const Sequelize = require('sequelize');
const db = require('../db');
var inviteMaster = require('./invite_master').inviteMaster
var resultMaster = require('./result_master').resultMaster

const roomMaster = db.define('room_master', {
    room_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    _user_id: {
        type: Sequelize.INTEGER,
    },
    room_unique_id: {
        type: Sequelize.STRING(100),
    },
    room_name: {
        type: Sequelize.STRING(100),
    },
    room_type: {
        type: Sequelize.STRING(100),
    },
    room_code: {
        type: Sequelize.STRING(100),
    },
    min_player: {
        type: Sequelize.INTEGER,
    },
    max_player: {
        type: Sequelize.INTEGER,
    },
    available: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    is_start_room: {
        type: Sequelize.ENUM('start', 'stop', 'pause'),
        defaultValue: 'stop'
    },
    is_delete: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    status: {
        type: Sequelize.STRING(15),
        defaultValue: 'active'
    },
});


module.exports = {
    roomMaster
}
roomMaster.hasMany(inviteMaster, { foreignKey: '_room_id' })
inviteMaster.belongsTo(roomMaster, { as: 'room_detail', foreignKey: '_room_id' })

roomMaster.hasMany(resultMaster, { foreignKey: '_room_id' })
resultMaster.belongsTo(roomMaster, { as: 'room_detail', foreignKey: '_room_id' })
