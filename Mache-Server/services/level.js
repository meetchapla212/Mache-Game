const levelMaster = require('../models/level_master').levelMaster;
const sequelize = require('../db');

const addLevel = data => levelMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! Level added successfully!" }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});


const getAllLevels = (pageNo, dataLimit) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0
        },
        attributes: ['level_id', 'level_name', 'level_image', 'potato_quantity'],
        offset: offset,
        limit: dataLimit,
        order: [['level_id', 'ASC']]
    };
    return levelMaster.findAndCountAll(query).then(sequelize.getValues)
}

const getAllLevelsPotato = (pageNo, dataLimit) => {
    // var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0
        },
        attributes: ['potato_quantity'],
        // offset: offset,
        // limit: dataLimit,
        // order: [['level_id', 'DESC']]
    };
    return levelMaster.findAll(query).then(sequelize.getValues)
}

const getLevelByPotatoQuantity = (quantity) => {
    var query = {
        where: {
            potato_quantity: quantity
        },
        attributes: ['level_id', 'level_name', 'level_image', 'potato_quantity'],
    };
    return levelMaster.findOne(query).then(sequelize.getValues)
}


const getLevelById = (id) => {
    var query = {
        where: {
            level_id: id
        },
        attributes: ['level_id', 'level_name', 'level_image', 'potato_quantity'],
    };
    return levelMaster.findOne(query).then(sequelize.getValues)
}


const updateLevelById = (data, query) => {
    return levelMaster.update(data, query).then(function ([rowsUpdate, [updatedLevel]]) {
        return updatedLevel;
    })
}



module.exports = {
    addLevel,
    getAllLevels,
    getLevelById,
    updateLevelById,
    getAllLevelsPotato,
    getLevelByPotatoQuantity
}