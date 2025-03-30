const Sequelize = require('sequelize');
const db = require('../db');

const achievementMaster = db.define('achievement_masters', {
    achievement_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    achievement_name: {
        type: Sequelize.STRING(),
    },
    achievement_image: {
        type: Sequelize.STRING(100),
    },
    potato_quantity: {
        type: Sequelize.INTEGER,
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
    achievementMaster
}