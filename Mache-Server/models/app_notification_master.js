const Sequelize = require('sequelize');
const db = require('../db');


const appNotificationMaster = db.define('app_notification_master', {
    app_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    _user_id: {
        type: Sequelize.INTEGER,
    },
    device_token: {
        type: Sequelize.STRING(100),
    },
    device_id: {
        type: Sequelize.STRING(100),
    },
    device_type: {
        type: Sequelize.STRING(100),
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
    appNotificationMaster
}
