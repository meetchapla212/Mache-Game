const Sequelize = require('sequelize');
const db = require('../db');


const diamondMaster = db.define('diamond_package_master', {
    diamond_package_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    diamond_name: {
        type: Sequelize.STRING(100),
    },
    diamond_quantity: {
        type: Sequelize.INTEGER,
    },
    total_amount: {
        type: Sequelize.FLOAT(),
    },
    diamond_type: {
        type: Sequelize.STRING(20),
    },
    plan_id: {
        type: Sequelize.STRING,
    },
    is_recurring: {
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
    diamondMaster
}
