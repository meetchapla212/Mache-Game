const resultMaster = require('../models/result_master').resultMaster;
const userMaster = require('../models/app_users_master').userMaster;
var Sequelize = require('sequelize');
const sequelize = require('../db');
const moment = require('moment');

const addResult = data => resultMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! Result added successfully!", data: result }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});

const getCurrentRoundResultByRoomId = (data) => {
    var query = {
        where: {
            _room_unique_id: data.room_unique_id,
            round: data.round,
        },
        include: [
            {
                model: userMaster,
                as: 'user_detail',
                attributes: [
                    'user_id',
                    'name',
                    'user_image'
                ],
            }
        ],
        returning: true,
    };
    return resultMaster.findAll(query).then(sequelize.getValues)

}

const getOverAllResultByRoomId = (roomUniqueId) => {
    var query = {
        where: {
            _room_unique_id: roomUniqueId,
        },
        include: [
            {
                model: userMaster,
                as: 'user_detail',
                attributes: [
                    'user_id',
                    'name',
                    'user_image'
                ],
            }
        ],
        order: [
            ['round', 'DESC'],
        ],
        returning: true,
    };
    return resultMaster.findAll(query).then(sequelize.getValues)
}

const getUserPoints = async (userId) => {
    var whereStatement = {};
    whereStatement._user_id = userId
    var query = {
        where: whereStatement,
        attributes:  [
            '_user_id',
            [sequelize.fn('sum', sequelize.col('points')), 'points']
        ],
        group: ['_user_id']
    };
    return resultMaster.findOne(query).then(sequelize.getValues)
}

const getUserRankInLeaderBoard = async (points) => {
    var query = {
        attributes:  [
            '_user_id'
        ],
        group: ['_user_id'],
        having: sequelize.where(sequelize.fn('sum', sequelize.col('points')), {
            [Sequelize.Op.gt]: points,
          }),
    };
    return resultMaster.count(query).then(sequelize.getValues)
}

const getMainLeaderBoard = async (pageNo, dataLimit, points) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        attributes:  [
            '_user_id',
            [sequelize.fn('sum', sequelize.col('points')), 'points'],
            [sequelize.fn('count', sequelize.col('id')), 'count'],
        ],
        group: ['_user_id'],
        // having: sequelize.where(sequelize.fn('sum', sequelize.col('points')), {
        //     [Sequelize.Op.gt]: points,
        //   }),
        order: [ sequelize.literal('points DESC')],
        offset: offset,
        limit: dataLimit
    };
    return resultMaster.findAll(query).then(sequelize.getValues)
}

const updateResult = (data, query) => {
    return resultMaster.update(data, query).then(function ([rowsUpdate, [updatedResult]]) {
        return updatedResult;
    })
}

const getResultByUserId = async (userId) => {
    var whereStatement = {};
    whereStatement._user_id = userId
    var query = {
        where: whereStatement,
        attributes:  [
            '_user_id',
            [sequelize.fn('sum', sequelize.col('points')), 'points'],
            [sequelize.fn('count', sequelize.col('id')), 'count'],
        ],
        group: ['_user_id']
    };
    return resultMaster.findOne(query).then(sequelize.getValues)
}

const checkResultExist = async (data) => {
    var whereStatement = data;
    var query = {
        where: whereStatement,
        returning: true
    };
    return resultMaster.findOne(query).then(sequelize.getValues)
}

const getLastRoundWinnerByRoomId = (data) => {
    var query = {
        attributes:  [
          '_user_id',
          'points'
        ],
        where: {
            _room_unique_id: data.room_unique_id,
            round: data.round,
        },
        order: [ sequelize.literal('points DESC')],
        limit: 1,
    };
    return resultMaster.findOne(query).then(sequelize.getValues)

}


module.exports = {
    addResult,
    getCurrentRoundResultByRoomId,
    getOverAllResultByRoomId,
    getUserPoints,
    getUserRankInLeaderBoard,
    getMainLeaderBoard,
    updateResult,
    getResultByUserId,
    checkResultExist,
    getLastRoundWinnerByRoomId
}