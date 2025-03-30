const paymentMaster = require('../models/payment_history').paymentMaster;
const packageMaster = require('../models/package_master').packageMaster;
var Sequelize = require('sequelize');
const sequelize = require('../db');
const moment = require('moment');

const addPayment = data => paymentMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! payment created successfully!", data: result }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});


const getAllPayments = (pageNo, dataLimit) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0
        },
        attributes: ["payment_id", "_user_id", "_package_id", "package_name", "package_description", "diamond_quantity",  "stars_quantity", "total_amount", "currency_type", "is_vip",  "is_active", "is_delete"],
        offset: offset,
        limit: dataLimit,
        order: [['payment_id', 'ASC']]
    };

    return paymentMaster.findAll(query).then(sequelize.getValues)
};

const getUsersPayment = (pageNo, dataLimit, userId) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0,
            _user_id: userId
        },
        attributes: ["payment_id", "_user_id", "_package_id", "package_name", "package_description", "diamond_quantity",  "stars_quantity", "total_amount", "currency_type", "is_vip",  "is_active", "is_delete"],
        offset: offset,
        limit: dataLimit,
        order: [['_user_id', 'DESC']]
    };

    return paymentMaster.findAll(query).then(sequelize.getValues)
};

module.exports = {
    addPayment,
    getAllPayments,
    getUsersPayment
}