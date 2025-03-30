const roomMaster = require('../models/room').roomMaster;
var Sequelize = require('sequelize');
const sequelize = require('../db');
const moment = require('moment');

const addRoom = data => roomMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! Room created successfully!", data: result }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});

const getAllRooms = (pageNo, dataLimit) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0,
            available: 0,
            // room_type: 'public'
        },
        attributes: ["room_id", "room_unique_id", "room_name", "room_type", "room_code", "min_player", "max_player"],
        offset: offset,
        limit: dataLimit,
        order: [['room_id', 'ASC']]
    };

    return roomMaster.findAll(query).then(sequelize.getValues)
};

const getUsersRooms = (pageNo, dataLimit, userId) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0,
            available: 1,
            _user_id: userId
            // room_type: 'public'
        },
        attributes: ["room_id", "room_unique_id", "room_name", "room_type", "room_code", "min_player", "max_player"],
        offset: offset,
        limit: dataLimit,
        order: [['room_id', 'DESC']]
    };

    return roomMaster.findAll(query).then(sequelize.getValues)
};

const getRoomById = (id) => {
    var query = {
        where: {
            is_delete: 0,
            available: 0,
            room_unique_id: id
        },
    };
    return roomMaster.findOne(query).then(sequelize.getValues)
}

const getRoomByCode = (code) => {
    var query = {
        where: {
            is_delete: 0,
            available: 0,
            room_code: code
        },
        returning: true, 
    };
    return roomMaster.findOne(query).then(sequelize.getValues)
}

const updateRoomById = (data, query) => {
    return roomMaster.update(data, query).then(function ([rowsUpdate, [updatedRoom]]) {
        return updatedRoom;
    })
}

const roomDeleteCron = (data) => {
        console.log('---------------------');
        console.log('Room Delete Cron Job Called');
        var dateTime = moment().subtract(24,'hours').format('YYYY-MM-DD HH:mm:ss');
        var data = {
            available: 1
        }
        var query = {
            where: {
                is_delete: 0,
                available: 0,
                createdAt: {[Sequelize.Op.lt]: dateTime}
            },
            returning: true, 
        };
        return roomMaster.update(data, query).then(function ([rowsUpdate, [updatedRoom]]){
            console.log(rowsUpdate + ' Rooms Deleted');
            return rowsUpdate;
        });
}

module.exports = {
    addRoom,
    getAllRooms,
    updateRoomById,
    getRoomById,
    getRoomByCode,
    getUsersRooms,
    roomDeleteCron
}