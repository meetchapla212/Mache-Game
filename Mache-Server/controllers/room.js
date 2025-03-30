const roomService = require('../services/room');
const config = require('../config');
var multer = require('multer');
const mkdirp = require('mkdirp');
const uuid = require('uuid');
const { result } = require('lodash');


function addRoom(req, res) {
    var body = req.body
    var roomUniqueId = uuid.v1();
    body.room_unique_id = roomUniqueId
    // body.sockets = []
    console.log(body)
    return roomService.addRoom(body).then((result) => {
        if (result) {
            var response = { status: true, message: 'Your Room has been created', data: result.data }
        }
        else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    })
};


function getAllRooms(req, res) {

    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    return roomService.getAllRooms(pageNo, dataLimit).then(result => {
        if (result.length > 0) {
            var response = { status: true, data: result }
        } else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    });
}

function getUsersRooms(req, res) {
    var user_id = req.user.id;
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    return roomService.getUsersRooms(pageNo, dataLimit, user_id).then(result => {
        if (result.length > 0) {
            var response = { status: true, data: result }
        } else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    });
}

function startRound(req, res) {
    var query = {
        where: {
            is_delete: 0,
            room_id: req.body.room_id,
            room_unique_id: req.body.room_unique_id
        },
        returning: true, 
    }

    var data = {
        is_start_room: req.body.is_start_room
    }

    return roomService.updateRoomById(data, query).then(result => {
        if (result.dataValues) {
            var response = { status: true, data: result.dataValues }
        } else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    });
}

function roomDeleteCron(req, res){
    roomService.roomDeleteCron().then(result => {
        var response = { status: true, message: result + ' Rooms Deleted' }
        res.send(response)
    })
}

module.exports = {
    getAllRooms,
    addRoom,
    getUsersRooms,
    startRound,
    roomDeleteCron,
}