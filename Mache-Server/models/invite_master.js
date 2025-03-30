const Sequelize = require('sequelize');
const db = require('../db');


const inviteMaster = db.define('invite_master', {
    invite_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    _user_id: {
        type: Sequelize.INTEGER,
    },
    _friend_id: {
        type: Sequelize.INTEGER,
    },
    _room_id: {
        type: Sequelize.INTEGER,
    },
    _room_unique_id: {
        type: Sequelize.STRING(50),
    },
    _room_code: {
        type: Sequelize.STRING(20),
    },
    invite_status: {
        type: Sequelize.STRING(20),
        defaultValue: 'pending'
    },
    is_read: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    inviteMaster
}
