const Sequelize = require('sequelize');
const db = require('../db');

const paymentMaster = db.define('payment_history', {
    payment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    _user_id: {
        type: Sequelize.INTEGER,
    },
    _package_id: {
        type: Sequelize.INTEGER,
    },
    package_name: {
        type: Sequelize.STRING,
    },
    package_description: {
        type: Sequelize.STRING,
    },
    total_amount: {
        type: Sequelize.STRING,
    },
    diamond_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    paymentMaster
}