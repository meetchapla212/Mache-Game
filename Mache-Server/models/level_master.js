const Sequelize = require('sequelize');
const db = require('../db');

const levelMaster = db.define('level_masters', {
    level_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    level_name: {
        type: Sequelize.STRING(),
    },
    level_image: {
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
    levelMaster
}