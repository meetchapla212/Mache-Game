const inviteService = require('../services/invite');
const roomService = require('../services/room');
const config = require('../config');
const { result } = require('lodash');
// var multer = require('multer');
// const mkdirp = require('mkdirp');
// const uuid = require('uuid');


function updateInvitation(req, res) {
    var body = req.body;
    var details = {};
    details.invite_status = body.invite_status
    if (body.invite_status === 'rejected') {
        return inviteService.updateInvitationById(details, {
            returning: true, where: { invite_id: body.invite_id }
        }).then(result => {
            if (result) {
                var response = { status: true, message: "Invitation rejected!" }
            } else {
                var response = { status: false, message: config.no_data_message }
            }
            res.send(response)
        })
    } else {
        return inviteService.getInvitationById(body.invite_id).then(result => {
            if (result) {
                return roomService.getRoomById(result.dataValues._room_unique_id).then(result => {
                    if (result) {
                        // return inviteService.updateInvitationById(details, {
                        //     returning: true, where: { invite_id: body.invite_id }
                        // }).then(result => {
                        //     if (result) {
                        var response = { status: true, message: "Room is available!" }
                        // } else {
                        //     var response = { status: false, message: config.no_data_message }
                        // }
                        res.send(response)
                        // })
                    }
                    else {
                        details.invite_status = 'expired';
                        return inviteService.updateInvitationById(details, {
                            returning: true, where: { invite_id: body.invite_id }
                        }).then(result => {
                            if (result) {
                                var response = { status: true, message: "Invitation expired and Room is not availabel!" }
                            } else {
                                var response = { status: false, message: config.no_data_message }
                            }
                            res.send(response)
                        })
                    }
                })
            } else {
                var response = { status: false, message: config.no_data_message }
                res.send(response)
            }
        });
    }
}

function getUserAcceptedInvitation(req, res) {
    var friendId = req.user.id
    return inviteService.getUserAcceptedInvitation(friendId).then(result => {
        if (result) {
            console.log("getUserAcceptedInvitation result ==> ", result)
            let serverURL = config.getServerUrl(req)
            let imagePath;
            result.forEach((user) => {
                if (user.dataValues.app_users.dataValues.user_image === 'default.png') {
                    imagePath = serverURL + config.avatarImagePath + user.dataValues.app_users.dataValues.user_image;
                } else {
                    imagePath = serverURL + config.appUserImagePath + user.dataValues.app_users.dataValues.user_image
                }
                user.dataValues.app_users.dataValues.user_imageS = imagePath;
                //user.dataValues.app_users.dataValues.user_image = serverURL + config.avatarImagePath + user.dataValues.app_users.dataValues.user_image
            })
            var response = { status: true, data: result };
        } else {
            var response = { status: false, message: config.no_data_message };
        }
        res.send(response);
    });
};

module.exports = {
    updateInvitation,
    getUserAcceptedInvitation
}