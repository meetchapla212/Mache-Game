const diamondMaster = require('../models/diamond_master').diamondMaster;
const sequelize = require('../db');

const addDiamond = data => diamondMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! Diamond added successfully!" }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});

const getAllDiamonds = (pageNo, dataLimit) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0
        },
        attributes: ['diamond_package_id', 'diamond_name', 'diamond_quantity', 'total_amount', 'diamond_type', 'is_recurring', 'plan_id'],
        offset: offset,
        limit: dataLimit,
        order: [['diamond_package_id', 'DESC']]
    };

    return diamondMaster.findAndCountAll(query).then(sequelize.getValues)
};

const getDiamondById = (id) => {
    var query = {
        where: {
            diamond_package_id: id
        },
        attributes: ['diamond_package_id', 'diamond_name', 'diamond_quantity', 'total_amount', 'diamond_type', 'is_recurring', 'plan_id'],
    };
    return diamondMaster.findOne(query).then(sequelize.getValues)
};

const updateDiamondById = (data, query) => {
    return diamondMaster.update(data, query).then(function ([rowsUpdate, [updatedDiamond]]) {
        return updatedDiamond;
    })
};

module.exports = {
    addDiamond,
    getAllDiamonds,
    getDiamondById,
    updateDiamondById,
};
