const resultService = require('../services/result');
const roomService = require('../services/room');
const appUserService = require('../services/app_user');
const config = require('../config');
//var multer = require('multer');
//const mkdirp = require('mkdirp');
//const uuid = require('uuid');
//const { result } = require('lodash');

const addNewResult = async (resultDetail, round, roomDetail) => {
    let setObject = {
        _room_unique_id: roomDetail.room_unique_id,
        _room_id: roomDetail.room_id,
        _user_id: resultDetail.user_id,
        points: resultDetail.points,
        round: round
    }
    return resultService.addResult(setObject).then((resData) => {
        return resData.data
    })
}

const addResult = async (req, res) => {
    var body = req.body
    var user_id = req.user.id;
    let getroomdetails = await roomService.getRoomById(body.room_unique_id).then(result => {
        return result.dataValues;
    });

    return Promise.all(body.resultData.map(async (resData) => {
        return await addNewResult(resData, body.round, getroomdetails)
    }))
        .then(response => {
            var data = { status: true, message: "Success! Result added successfully!", data: response }
            res.send(data)
        })
}

const getCurrentRoundResultByRoomId = async (req, res) => {
    var body = req.body
    var user_id = req.user.id;
    return resultService.getCurrentRoundResultByRoomId(body).then((resData) => {
        let serverURL = config.getServerUrl(req)
        let imagePath;
        resData.forEach((user) => {
            if (user.user_detail.user_image === 'default.png') {
                imagePath = serverURL + config.avatarImagePath + user.user_detail.user_image;
            } else {
                imagePath = serverURL + config.appUserImagePath + user.user_detail.user_image
            }
            user.user_detail.user_image = imagePath;
        })
        var data = { status: true, message: "Success!", data: resData }
        res.send(data)
    })

}

const getOverAllResultByRoomId = async (req, res) => {
    var body = req.body
    var user_id = req.user.id;
    return resultService.getOverAllResultByRoomId(body.room_unique_id).then((resData) => {
        let serverURL = config.getServerUrl(req)
        let imagePath;
        resData.forEach((user) => {
            if (user.user_detail.user_image === 'default.png') {
                imagePath = serverURL + config.avatarImagePath + user.user_detail.user_image;
            } else {
                imagePath = serverURL + config.appUserImagePath + user.user_detail.user_image
            }
            user.user_detail.user_image = imagePath;
        })
        var data = { status: true, message: "Success!", data: resData }
        res.send(data)
    })
}

function getMainLeaderBoard(req, res) {
   var userId = req.user.id;
    const { uId } = req.params;
    if (uId && uId != null) {
        userId = uId;
    }
    userId = userId * 1;
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit && req.query.limit > 0) ? req.query.limit : 10;;
     return resultService.getUserPoints(userId).then((points) => {
        if (points) {
            var userPoints = points.dataValues.points
            return resultService.getUserRankInLeaderBoard(userPoints).then(rank => {
                if(rank){
                    return resultService.getMainLeaderBoard(pageNo, dataLimit, userPoints).then(result => {
                        if(result){
                            let serverURL = config.getServerUrl(req)
                            const userDataFunction = async (resDataItem) => {
                                let userSoloResult = await appUserService.getUserDetails(resDataItem.dataValues._user_id);
                                resDataItem.dataValues.name = userSoloResult.dataValues.name ? userSoloResult.dataValues.name : '';
                                if (userSoloResult.dataValues.user_image === 'default.png') {
                                    resDataItem.dataValues.user_image = serverURL + config.avatarImagePath + userSoloResult.dataValues.user_image;
                                } else {
                                    resDataItem.dataValues.user_image = serverURL + config.appUserImagePath + userSoloResult.dataValues.user_image;
                                }
                              
                                return resDataItem.dataValues;
                            }
                            return Promise.all(result.map(resData => userDataFunction(resData)))
                                .then(data => {
                                    var response = { status: true, message: "Success!", data: {user_points: userPoints, user_rank: rank.length + 1, leaderboards: data} }
                                    res.send(response);
                                })
                        }
                        else {
                            var response = { status: false, message: config.no_data_message };
                            res.send(response);
                        }
                    })
                }
            })
        } else {
            var response = { status: false, message: config.no_data_message };
            res.send(response);
        }
    })
};

const updateResult = async (req, res) => {
    var query = {
        where: {
            _room_unique_id: req.body.room_unique_id,
            _user_id: req.user.id,
            round: req.body.round
        },
        returning: true, 
    }

    var data = {
        next_game_status: req.body.game_status
    }

    return resultService.updateResult(data, query).then(result => {
        if (result) {
            var response = { status: true,  message: 'Status update successfully!', data: result.dataValues }
        } else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    });
}

module.exports = {
    addResult,
    getCurrentRoundResultByRoomId,
    getOverAllResultByRoomId,
    getMainLeaderBoard,
    updateResult
}