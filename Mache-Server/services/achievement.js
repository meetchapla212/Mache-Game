const achievementMaster = require('../models/achievement_master').achievementMaster;
const sequelize = require('../db');

const addAchievement = data => achievementMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! Achievement added successfully!" }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});


const getAllAchievements = (pageNo, dataLimit) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0
        },
        attributes: ['achievement_id', 'achievement_name', 'achievement_image', 'potato_quantity'],
        offset: offset,
        limit: dataLimit,
        order: [['achievement_id', 'ASC']]
    };
    return achievementMaster.findAndCountAll(query).then(sequelize.getValues)
}

const getAllAchievementsPotato = (pageNo, dataLimit) => {
    // var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0
        },
        attributes: ['potato_quantity'],
        // offset: offset,
        // limit: dataLimit,
        // order: [['achievement_id', 'DESC']]
    };
    return achievementMaster.findAll(query).then(sequelize.getValues)
}

const getAchievementByPotatoQuantity = (quantity) => {
    var query = {
        where: {
            potato_quantity: quantity
        },
        attributes: ['achievement_id', 'achievement_name', 'achievement_image', 'potato_quantity'],
    };
    return achievementMaster.findOne(query).then(sequelize.getValues)
}


const getAchievementById = (id) => {
    var query = {
        where: {
            achievement_id: id
        },
        attributes: ['achievement_id', 'achievement_name', 'achievement_image', 'potato_quantity'],
    };
    return achievementMaster.findOne(query).then(sequelize.getValues)
}


const updateAchievementById = (data, query) => {
    return achievementMaster.update(data, query).then(function ([rowsUpdate, [updatedAchievement]]) {
        return updatedAchievement;
    })
}



module.exports = {
    addAchievement,
    getAllAchievements,
    getAchievementById,
    updateAchievementById,
    getAllAchievementsPotato,
    getAchievementByPotatoQuantity
}