var friendRequestService = require('../services/friend_request');
var appUserService = require('../services/app_user');
var resultService = require('../services/result');
const config = require('../config');
const moment = require('moment');
var notificationController = require('./notification')
// var socket = require('../socket/index')

function sendRequest(req, res) {
    const friendRequestDetails = req.body;
    var result = [];
    var status;
    var friendidArray = friendRequestDetails._friend_id.split(',');
    const friendRequestFunction = (resDataItem) => {
            friendRequestDetails._friend_id = resDataItem * 1;
            friendRequestDetails._user_id = (req.user.id) * 1;
           return friendRequestService.sendRequest(friendRequestDetails).then(data => {
               if(data && data.status == true){
                status = true;
               }
                    return data;
             });
    }

    return Promise.all(friendidArray.map(friendData => friendRequestFunction(friendData)))
        .then(data => {
            if(data){
                if(data.length > 1){
                    if(status == true){
                        var response = { status: true, message: "Success! Request send successfully!" }
                        res.send(response);
                     }
                     else{
                         var response = { status: false, message: "Already sent" }
                         res.send(response);
                     }
                }
                else{
                    res.send(data[0]);
                }
            }
        })
    
    // return friendRequestService.sendRequest(friendRequestDetails).then(data => {
    //     // socket.getUserFriendRequest(friendRequestDetails._friend_id)
    //     res.send(data)
    // });
};

function getPendingRequest(req, res) {
    var friendId = req.user.id
    return friendRequestService.getPendingRequest(friendId).then(result => {
        if (result) {
            let serverURL = config.getServerUrl(req)
            result.forEach((user) => {
                user.dataValues.app_users_master.dataValues.user_image = serverURL + config.avatarImagePath + user.dataValues.app_users_master.dataValues.user_image
            })
            var response = { status: true, data: result };
        } else {
            var response = { status: false, message: config.no_data_message };
        }
        res.send(response);
    });
};


function acceptRequest(req, res) {
    var friendId = req.user.id
    const friendRequestDetails = req.body;
    friendRequestDetails.friend_request_id = (friendRequestDetails.friend_request_id) * 1;
    //friendRequestDetails._friend_id = (friendId) * 1;
    friendRequestDetails.is_pending = 1;
    return friendRequestService.getPendingRequestbyId(friendRequestDetails.friend_request_id, friendId).then(result => {
        if (result.length > 0) {
            return friendRequestService.acceptRequest(friendRequestDetails, {
                returning: true, where: { friend_request_id: friendRequestDetails.friend_request_id }
            }).then(data => {
                if (data) {
                    if (data === 1) {
                        var response = { status: true, message: "Request Declined!" }
                    } else {
                        var response = { status: true, message: "You both are friends now!" }
                    }
                } else {
                    var response = { status: false, message: "Unable!" }
                }
                res.send(response)
            })
        } else {
            var response = { status: false, message: config.no_data_message }
            res.send(response);
        }
    })
};

function getAllUsers(req, res) {
    var user_id = req.user.id;
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    return appUserService.getAllUsers(pageNo, dataLimit, user_id).then(result => {
        if (result) {
            let serverURL = config.getServerUrl(req)
            result.forEach(async (user) => {
                // var result = await friendArrayForSuggestion(user['user_id']);
                user['user_image'] = serverURL + config.avatarImagePath + user['user_image'];
            })
            var response = { status: true, data: result };
        } else {
            var response = { status: false, message: config.no_data_message };
        }
        res.send(response);
    });
};

async function friendArrayForSuggestion(userId) {
    return friendRequestService.getFriendFromUsers(userId).then(user => {
        var result = [];
        // result.push(userId)
        if (user) {
            user.forEach((resData) => {
                result.push(resData.dataValues._friend_id)
            });
            return friendRequestService.getFriendFromFriends(userId).then(friend => {
                if (friend) {
                    friend.forEach((friendData) => {
                        friendData.dataValues["_friend_id"] = friendData.dataValues._user_id
                        delete friendData.dataValues._user_id
                        result.push(friendData.dataValues._friend_id)
                    });
                    return result
                }
            })
        }
    })
}

async function checkStatus(_user_id, _friend_id) {
    return friendRequestService.isYourFriendUserColumn(_user_id, _friend_id).then(item => {
        if (item) {
            if (item.dataValues.is_pending === 0) {
                return true
            }
        } else {
            return friendRequestService.isYourFriendUserColumn(_friend_id, _user_id).then(data => {
                if (data) {
                    if (data.dataValues.is_pending === 0) {
                        return true
                    }
                } else {
                    return false
                }
            })
        }
    })
}

async function getSuggestionFriend(req, res) {
    var userId = req.user.id
    var body = req.query

    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    var result = await friendArrayForSuggestion(userId);
  //  future use--------------
  //  result.push(userId)
  //  return appUserService.getSuggestionFriend(pageNo, dataLimit, body, result).then(friendData => {
    return appUserService.getSuggestionFriend(pageNo, dataLimit, body, userId).then(friendData => {
        if (friendData) {
            let serverURL = config.getServerUrl(req)
            const friendFunction = async (resDataItem) => {
                let imagePath;
                if (resDataItem['user_image'] === 'default.png') {
                    imagePath = serverURL + config.avatarImagePath + resDataItem['user_image'];
                } else {
                    imagePath = serverURL + config.appUserImagePath + resDataItem['user_image'];
                }
                resDataItem['user_image'] = imagePath;
                //resDataItem['user_image'] = serverURL + config.avatarImagePath + resDataItem['user_image'];
                resDataItem.dataValues['is_requested'] = await checkStatus(userId, resDataItem['user_id'])
                resDataItem.dataValues['is_friend'] = result.includes(resDataItem['user_id']) ? true : false;
                return resDataItem;
            }

            return Promise.all(friendData.map(resData => friendFunction(resData)))
                .then(data => {
                    var response = { status: true, data: data }
                    res.send(response);
                })
        }
    })
}

async function friendArray(userId) {
    return friendRequestService.getFriendFromUsers(userId).then(user => {
        var result = [];
        // result.push(userId)
        if (user) {
            user.forEach((resData) => {
                let data = { id: resData.dataValues._friend_id, date: resData.dataValues.updatedAt }
                result.push(data)
            });
            return friendRequestService.getFriendFromFriends(userId).then(friend => {
                if (friend) {
                    friend.forEach((friendData) => {
                        let item = { id: friendData.dataValues._user_id, date: friendData.dataValues.updatedAt }
                        result.push(item)
                    });
                    return result
                }
            })
        }
    })
}

async function getRecentFriend(req, res) {
    var userId = req.body.user_id? req.body.user_id : req.user.id;
    var body = req.body
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;
    const { uId } = req.params;
    if (uId && uId != null) {
        userId = uId;
    }
    var result = await friendArray(userId);
    await result.sort(function (a, b) {
        return b['date'] - a['date'];
    })
    var sortResult = [];
    result.forEach((ele) => {
        sortResult.push(ele.id)
    })

    return appUserService.getUserName(body)
        .then(name => {
            if (name) {
                var nameLikeArray = [];
                name.map((user) => {
                    nameLikeArray.push(user.dataValues.user_id)
                })
                Array.prototype.diff = function (arr2) {
                    var ret = [];
                    for (var i = 0; i < this.length; i += 1) {
                        if (arr2.indexOf(this[i]) > -1) {
                            ret.push(this[i]);
                        }
                    }
                    return ret;
                };
                var finalFriend = sortResult.diff(nameLikeArray)

                const userFunction = async (resDataItem) => {
                    return appUserService.getUserDetails(resDataItem)
                        .then(userRes => {
                            if (userRes) {
                                userRes.dataValues['user_points'] =  0;
                                userRes.dataValues['played_games'] =  0;
                                let serverURL = config.getServerUrl(req)
                                userRes['user_image'] = serverURL + config.avatarImagePath + userRes['user_image'];
                                return resultService.getResultByUserId(resDataItem)
                                .then(userResult => {
                                    if(userResult){
                                        userRes.dataValues['user_points'] =  userResult.dataValues.points? userResult.dataValues.points : 0;
                                        userRes.dataValues['played_games'] =  userResult.dataValues.count? userResult.dataValues.count : 0;
                                    }
                                return userRes
                                })
                            } else {
                                var response = { status: false, message: config.no_data_message };
                                res.send(response);
                            }
                        })
                }

                return Promise.all(finalFriend.slice(0, dataLimit).map(resData => userFunction(resData)))
                    .then(data => {
                        var response = { status: true, data: data }
                        res.send(response);
                    })
            } else {
                var response = { status: false, message: config.no_data_message };
                res.send(response);
            }
        })

};

function isYourFriend(req, res) {
    var _user_id = req.user.id
    var _friend_id = (req.body._friend_id) * 1;
    return friendRequestService.isYourFriendUserColumn(_user_id, _friend_id).then(item => {
        if (item) {
            if (item.dataValues.is_pending === 1) {
                var response = { status: true, data: 1, message: 'You both are friends!' }
            } else {
                var response = { status: true, data: 0, message: 'You already send the request!' }
            }
            res.send(response)
        } else {
            return friendRequestService.isYourFriendUserColumn(_friend_id, _user_id).then(data => {
                if (data) {

                    if (data.dataValues.is_pending === 1) {
                        var response = { status: true, data: 1, message: 'You both are friends!' }
                    } else {
                        var response = { status: true, data: 0, message: 'You already send the request!' }
                    }
                } else {
                    var response = { status: true, data: -1, message: 'not friend also not sended request' }
                }
                res.send(response)
            })
        }
    })
}


module.exports = {
    sendRequest,
    getPendingRequest,
    acceptRequest,
    getAllUsers,
    getSuggestionFriend,
    getRecentFriend,
    isYourFriend
}