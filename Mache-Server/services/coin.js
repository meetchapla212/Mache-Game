const coinMaster = require('../models/coin_master').coinMaster;
const sequelize = require('../db');

const addCoin = data => coinMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! Coin added successfully!" }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});

const getAllCoins = (pageNo, dataLimit) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0
        },
        attributes: ['coin_package_id', 'coin_name', 'coin_quantity', 'total_amount', 'coin_type', 'is_recurring', 'plan_id'],
        offset: offset,
        limit: dataLimit,
        order: [['coin_package_id', 'DESC']]
    };

    return coinMaster.findAndCountAll(query).then(sequelize.getValues)
};

const getCoinById = (id) => {
    var query = {
        where: {
            coin_package_id: id
        },
        attributes: ['coin_package_id', 'coin_name', 'coin_quantity', 'total_amount', 'coin_type', 'is_recurring', 'plan_id'],
    };
    return coinMaster.findOne(query).then(sequelize.getValues)
};

const updateCoinById = (data, query) => {
    return coinMaster.update(data, query).then(function ([rowsUpdate, [updatedCoin]]) {
        return updatedCoin;
    })
};

module.exports = {
    addCoin,
    getAllCoins,
    getCoinById,
    updateCoinById,
};
