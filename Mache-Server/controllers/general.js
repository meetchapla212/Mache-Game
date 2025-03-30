var friendRequestService = require('../services/friend_request');
var generalService = require('../services/general');
var packageService = require('../services/package');
const config = require('../config');
const inviteService = require('../services/invite');

function getCount(req, res) {
    return generalService.getCount().then(result => {
        if (result) {
            var response;
            return packageService.getCount().then(packages => {
                if(packages){
                    result.packages = packages;
                    response = { status: true, data: result }
                }
                else{
                    response = { status: true, data: result }
                }
                res.send(response)
            })
        } else {
            var response = { status: false, message: config.no_data_message }
            res.send(response)
        }
       
    });
}

function friendRequestFunction(userId) {
    var allNotifications = [];
    return friendRequestService.getPendingRequest(userId).then(result => {
        if (result) {
            let serverURL = config.getServerUrl()
            result.forEach((user) => {
                user.dataValues.app_users_master.dataValues.user_image = serverURL + config.avatarImagePath + user.dataValues.app_users_master.dataValues.user_image;
                user.dataValues.type = 'friend_request';
                user.dataValues.title = 'send you a friend request!';
                allNotifications.push(user.dataValues);
            })
            return allNotifications
        }
    });
}

function friendRequestResponseFunction(userId) {
    var allNotifications = [];
    return friendRequestService.getCompleteRequestForUser(userId).then(result => {
        if (result) {
            let serverURL = config.getServerUrl()
            result.forEach((user) => {
                var detail = {}
                detail.user_image = serverURL + config.avatarImagePath + user.dataValues.app_users_masters.dataValues.user_image;
                detail.type = 'general_notification';
                detail.title = user.dataValues.app_users_masters.dataValues.name + ' accepted your friend request!';
                detail.createdAt = user.dataValues.updatedAt
                allNotifications.push(detail);
                var friendRequestDetails = {};
                friendRequestDetails.is_read = 1;
                friendRequestDetails.friend_request_id = user.dataValues.friend_request_id
                friendRequestService.updateRequestById(friendRequestDetails, {
                    returning: true, where: { friend_request_id: friendRequestDetails.friend_request_id }
                })
            })
            return allNotifications
        }
    });
}

function inviteRequestResponseFunction(userId) {
    var allNotifications = [];
    return inviteService.getCompleteRequestForUser(userId).then(result => {
        if (result) {
            let serverURL = config.getServerUrl()
            result.forEach((user) => {
                var detail = {}
                detail.user_image = serverURL + config.avatarImagePath + user.dataValues.friend_users.dataValues.user_image;
                detail.type = 'general_notification';
                detail.title = user.dataValues.friend_users.dataValues.name + ' rejected your invitation!';
                detail.createdAt = user.dataValues.updatedAt
                allNotifications.push(detail);
                var inviteDetail = {};
                inviteDetail.is_read = 1;
                inviteDetail.invite_id = user.dataValues.invite_id
                inviteService.updateInvitationById(inviteDetail, {
                    returning: true, where: { invite_id: inviteDetail.invite_id }
                })
            })
            return allNotifications
        }
    });
}

function inviteRequestFunction(userId) {
    var allNotifications = [];
    return inviteService.getPendingInvitation(userId).then(result => {
        if (result) {
            let serverURL = config.getServerUrl()
            result.forEach((user) => {
                user.dataValues.app_users.dataValues.user_image = serverURL + config.avatarImagePath + user.dataValues.app_users.dataValues.user_image;
                user.dataValues.type = 'room_invitation';
                user.dataValues.title = 'send you a room invitation!';
                allNotifications.push(user.dataValues);
            })
            return allNotifications
        }
    });
}

async function getNotifications(req, res) {
    var userId = req.user.id
    var result = [];

    var friendRequest = await friendRequestFunction(userId)
    var inviteRequest = await inviteRequestFunction(userId)
    var completeFriendRequest = await friendRequestResponseFunction(userId)
    var completeinviteRequest = await inviteRequestResponseFunction(userId)

    if (friendRequest.length >= 0) {
        if (inviteRequest.length >= 0 && completeFriendRequest.length >= 0) {
            if (completeinviteRequest.length >= 0) {
                result = [...friendRequest, ...inviteRequest, ...completeFriendRequest, ...completeinviteRequest];
            } else {
                result = [...friendRequest, ...inviteRequest, ...completeFriendRequest];
            }
        } else if (inviteRequest.length >= 0 && completeFriendRequest.length <= 0) {
            if (completeinviteRequest.length >= 0) {
                result = [...friendRequest, ...inviteRequest, ...completeinviteRequest];

            } else {
                result = [...friendRequest, ...inviteRequest];
            }
        } else if (inviteRequest.length <= 0 && completeFriendRequest.length >= 0) {
            if (completeinviteRequest.length >= 0) {
                result = [...friendRequest, ...completeFriendRequest, ...completeinviteRequest];

            } else {
                result = [...friendRequest, ...completeFriendRequest];
            }
        } else {
            if (completeinviteRequest.length >= 0) {
                result = [...friendRequest, ...completeinviteRequest]

            } else {
                result = [...friendRequest]
            }
        }
    } else {
        if (inviteRequest.length >= 0 && completeFriendRequest.length >= 0) {
            if (completeinviteRequest.length >= 0) {
                result = [...inviteRequest, ...completeFriendRequest, ...completeinviteRequest];

            } else {
                result = [...inviteRequest, ...completeFriendRequest];
            }
        } else if (inviteRequest.length >= 0 && completeFriendRequest.length <= 0) {
            if (completeinviteRequest.length >= 0) {
                result = [...inviteRequest, ...completeinviteRequest];

            } else {
                result = [...inviteRequest];
            }
        } else if (inviteRequest.length <= 0 && completeFriendRequest.length >= 0) {
            if (completeinviteRequest.length >= 0) {
                result = [...completeFriendRequest, ...completeinviteRequest];

            } else {
                result = [...completeFriendRequest];
            }
        } else {
            if (completeinviteRequest.length >= 0) {
                result = [...completeinviteRequest]

            } else {
                result = []
            }
        }
    }
    result.sort(function (a, b) {
        return b['createdAt'] - a['createdAt'];
    })
    var response = { status: true, data: result }
    res.send(response)
};


module.exports = {
    getCount,
    getNotifications
}