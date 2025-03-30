
const userMaster = require('../models/app_users_master').userMaster;
const sequelize = require('../db');
var Sequelize = require('sequelize');

const getCount = () => {
    var query = {
        where: {
            is_delete: 0
        },
    };

    return userMaster.count(query).then(userInWeek => {
        var response = { users: userInWeek }
        return response
    })
}

module.exports = {
    getCount
};