const Sequelize = require('sequelize');
const db = require('../db');

const packageMaster = db.define('package_masters', {
    package_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    package_name: {
        type: Sequelize.STRING,
    },
    package_description: {
        type: Sequelize.STRING,
    },
    total_amount: {
        type: Sequelize.FLOAT,
    },
    diamond_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    is_delete: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    is_vip: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    stars_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    currency_type: {
        type: Sequelize.STRING,
    },
    
});

module.exports = {
    packageMaster
}