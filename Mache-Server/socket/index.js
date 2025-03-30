var roomService = require('../services/room');
var inviteService = require('../services/invite');
var resultService = require('../services/result');
var userList = require("./user/users_list");
var friendRequestService = require('../services/friend_request');
var appUserService = require('../services/app_user');
const config = require('../_config');
const uuid = require('uuid');
const { Socket } = require('socket.io-client');
var http = require('http'),
    fs = require('fs');
const { string } = require('joi');

// var index = fs.readFileSync(__dirname + '/index.html');
// var app = http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(index);
// });


var app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("Ok");
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

const rooms = {};
let lostInternet = [];

async function friendArray(userId) {
    return friendRequestService.getFriendFromUsers(userId).then(user => {
        var result = [];
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

async function getFriend(userId) {
    var result = await friendArray(userId);
    return result
};

// function getUserFriendRequest(userId) {
//     socket.to(userList.userSoc[userId].socketId).emit('NOTIFICATION');
// };

async function getUserProfile(user_id) {
    var pageNo = 1;
    var dataLimit = config.dataLimit;
    if (user_id) {
        return appUserService.getUserDetails(user_id)
            .then(async (userRes) => {
                if (userRes) {
                    let serverURL = config.getServerUrl()
                    let imagePath;
                    if (userRes['user_image'] === 'default.png') {
                        imagePath = serverURL + config.avatarImagePath + userRes['user_image'];
                    } else {
                        let fileNameWithPathUploadPath = config.uploadDir + config.appUserImagePath + userRes['user_image'];
                        if (fs.existsSync(fileNameWithPathUploadPath)) {
                            imagePath = serverURL + config.appUserImagePath + userRes['user_image'];
                        } else {
                            imagePath = serverURL + config.avatarImagePath + 'default.png';
                        }
                    }
                    userRes['user_image'] = imagePath;
                    return userRes
                } else {
                    return false
                }
            })
    } else {
        return false
    }
}
async function geRoomMember(roomId) {
    var roomMembers = [];
    await io.in(roomId).clients((err, clients) => {
        console.log("clients ==>", clients);
        if (clients) {
            clients.forEach(ele => {
                console.log("ele ==>", ele);
                console.log("userList.userSoc ==>", userList.userSoc);
                for (const id in userList.userSoc) {
                    if (userList.userSoc[id].socketId === ele) {
                        roomMembers.push(parseInt(id))
                    }
                }
            })
        }
    });
    return roomMembers
}

async function addWebSocketId(client, userId) {
    userList.userWebViewSoc[userId] = {
        socketId: client.id
    }
}

const removeComputerUserFromSocketList = async (roomUniqueId) => {
    console.log("rooms[roomUniqueId] ===============================>", rooms[roomUniqueId].usersList);
    if (!!rooms[roomUniqueId] && !!rooms[roomUniqueId].usersList) {
        return Promise.all(rooms[roomUniqueId].usersList.map(async (resData) => {
            console.log("resData ==>", resData);
            console.log("resData.isAvailable ==>", resData.isAvailable);
            console.log("resData ==>", typeof resData.isAvailable);
            if (!!resData.isAvailable) {
                console.log("================= check availaiblity ================")
            }
            let data;
            if (resData.isAvailable !== undefined && resData.isAvailable === false) {
                console.log("Inside If ===============================>")
                let removeUserId = resData.user_id;
                let removeUserSocketid = !!userList.userSoc[removeUserId] && userList.userSoc[removeUserId].socketId;
                let room = rooms[roomUniqueId];
                if (!!room) {
                    //console.log("room before==>", room);
                    room.sockets = room.sockets.filter((item) => item.id !== removeUserSocketid);
                    delete userList.userSoc[removeUserId];
                    //console.log("room after==>", room);
                    data = { status: true, message: 'user successfully removed !' }
                } else {
                    data = { status: false, message: 'room not available !' }
                }
            } else {
                console.log("Inside else ===============================>")
                data = { status: false, message: 'computer user not available !' }
            }
            return data;
            //return await userDataFunction(resData)
        })).then(response => {
            console.log("response 111111111111 =========>", response)
        })
    }
    return true;
}

const joinRoom = (socket, room) => {
    room.sockets.push(socket);
    socket.join(room.room_unique_id, () => {
        socket.roomId = room.room_unique_id;

        //console.log("room ==>", room);
        console.log('You entered in a room ' + room.room_unique_id);
        var dataDetail = { status: true, message: 'You entered in a room ' + room.room_unique_id, roomUniqueId: room.room_unique_id, roomName: room.room_name, roomCode: room.room_code, roomId: room.room_id }
        socket.emit('JOINPRIVATEROOM_RESPONSE', dataDetail);
        io.sockets.in(socket.roomId).emit('user joined', 'SERVER', ' has joined this room');
        return

    });
};

const addResult = async (resultDetail, round, roomDetail) => {
    //console.log("resultDetail ==>", resultDetail);
    //console.log("roomDetail ==>", roomDetail);
    let setObject = {
        _room_unique_id: roomDetail.room_unique_id,
        _room_id: roomDetail.room_id,
        _user_id: resultDetail.user_id,
        round: round
    }
    console.log("checkresultexist data=====================>", setObject)
    return await resultService.checkResultExist(setObject).then((res) => {
        console.log("checkresultexist=====================>" + res)
       if(res){
        console.log("checkresultexist if=====================>")
           return resultDetail
       }else{
        setObject.points=resultDetail.points
        console.log("checkresultexist else=====================>", setObject)
        return resultService.addResult(setObject).then((resData) => {
            return resData.data
        })
       }
    })
    
}

const joinWebRoom = (socket, room) => {
    //console.log("rooms[room.room_unique_id].sockets.length ===>", rooms[room.room_unique_id].sockets.length);
    //console.log("room.max_player", room.max_player);
    // if (!!room && rooms[room.room_unique_id] && rooms[room.room_unique_id].sockets.length === room.max_player) {
    //     console.log("room full")
    // } else {
    if (!!room && rooms[room.room_unique_id] && rooms[room.room_unique_id].sockets.length <= room.max_player) {
        rooms[room.room_unique_id].websockets.push(socket);
    }
    else {
        if (!!room && rooms[room.room_unique_id] && rooms[room.room_unique_id].sockets.length === room.max_player) {
            console.log("room full")
        } else {
            console.log("room not available")
        }
    }
    //}

}

const removeInvitations = (roomDetails) => {
    console.log(" removeInvitations roomDetails ", roomDetails);
    if (roomDetails.available === 1) {
        return inviteService.getInvitationByRoomUniqueId(roomDetails.room_unique_id).then(result => {
            listOfInvitations = result;
            console.log("result", result);
            console.log("listOfInvitations", listOfInvitations);
            if (!!listOfInvitations && listOfInvitations.length > 0) {
                listOfInvitations.map(invitaion => {
                    let details = {}
                    details.is_delete = 1;
                    return inviteService.updateInvitationById(details, {
                        returning: true, where: { invite_id: invitaion.dataValues.invite_id }
                    }).then(result => {
                        if (result) {
                            var response = { status: true, message: "Invitation rejected!" }
                        } else {
                            var response = { status: false, message: config.no_data_message }
                        }
                        console.log(response)
                        //res.send(response)
                    })
                })
            } else {
                console.log(config.no_data_message);
            }
        })
    }
}

const closeGameRooms = (socket) => {
    for (const id in rooms) {
        const room = rooms[id];
        if (room.sockets.includes(socket)) {
            socket.leave(id);
            // remove the socket from the room object
            let socketData = room.sockets.filter((item) => item === socket);

            if (socketData) {
                var roomDetails = {}
                roomDetails.available = 1;
                return roomService.updateRoomById(roomDetails, {
                    returning: true, where: { room_unique_id: room.room_unique_id }
                }).then(result => {
                    if (result) {
                        delete rooms[room.room_unique_id];
                        removeInvitations(result.dataValues);
                        var data = { status: true, message: 'delete a room' }
                        socket.emit('DELETEROOM_RESPONSE', data);
                    }
                })

            }
        }
    }
}


const leaveRooms = async (socket, userId, screen) => {
    const roomsToDelete = [];
    let gameScreen;
    if (typeof (userId) === 'string') {
        userId = parseInt(userId);
    }
    for (const id in rooms) {
        const room = rooms[id];
        // check to see if the socket is in the current room
        if (screen === 'internet') {
            gameScreen = rooms[id].screen;
        } else {
            gameScreen = screen;
        }
        //console.log("gameScreen ===============>", gameScreen);
        if (room.sockets.includes(socket)) {
            if(!!gameScreen){
                if (gameScreen === 'waiting') {
                    //console.log('In If Condition');
                    socket.leave(id);
                    // remove the socket from the room object
                    room.sockets = room.sockets.filter((item) => item !== socket);
                } else {
                    let findIndex = await rooms[id].usersList.findIndex((item) => item.user_id === userId);
                    rooms[id].usersList[findIndex].isAvailable = false
                    if (screen === 'internet') {
                        lostInternet.push(socket)
                    }
                }
            }
            // leave room web socket call
            room.websockets.forEach((value) => {
                console.log("value.id ==>", value.id)
                var data = { status: true, message: 'leaved a room', screen: screen, usersList: rooms[id].usersList, gameScreen: gameScreen }
                io.to(value.id).emit('LEAVEROOM_RESPONSE', data);
            })
        }
        // Prepare to delete any rooms that are now empty
        if (room.sockets.length == 0) {
            roomsToDelete.push(room);
        }
    }

    // Delete all the empty rooms that we found earlier
    for (const room of roomsToDelete) {
        var roomDetails = {}
        roomDetails.available = 1;
        return roomService.updateRoomById(roomDetails, {
            returning: true, where: { room_unique_id: room.room_unique_id }
        }).then(result => {
            if (result) {
                delete rooms[room.room_unique_id];
                removeInvitations(result.dataValues);
            }
        })
    }
};
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

io.on('connection', function (socket) {

    setInterval(() => {
        //console.log('check ==>', socket.connected);  //return true if connected, false otherwise
        // check for internet connection loss during game playing
        if (socket.connected === false) {
            //console.log("userList ==>", userList.userSoc)
            for (const key in userList.userSoc) {
                //console.log("key ==>", key)
                if (userList.userSoc[key].socketId === socket.id) {
                    //console.log("inside if  ==>", key)
                    let removeUserId = key;
                    if (!lostInternet.includes(socket)) {
                        leaveRooms(socket, removeUserId, 'internet');
                    } else {
                        //console.log('socket already lost internet');
                    }

                    //userList.removeUser(socket)
                }
            }
        }
    }, 1000);

    socket.on('LOGIN_SEND', function (data) {
        // socket.username = makeid(4)
        userList.addUser(data, socket);
        console.log('userList >>', userList)
        console.log("socket ==>", socket.id);
        var data = { status: true, message: 'join in socket' }
        socket.emit('LOGIN_RESPONSE', data);
    });

    socket.on('CREATEMATCH_SEND', (data) => {
        console.log("data ===>", data);
        let loginUserId = data._user_id;
        var roomUniqueId = uuid.v1();
        data.room_unique_id = roomUniqueId
        data.room_code = makeid(8);
        data.sockets = [];
        data.websockets = [];
        userList.addUser(loginUserId, socket); // update new socketId in room
        //console.log('userList new join 11 >>', userList)
        // joinRoom(socket, data);
        // rooms[roomUniqueId] = data;
        return roomService.addRoom(data).then((result) => {
            console.log("result==========================>" + result.data);
            data.room_id = result.data.dataValues.room_id;
            joinRoom(socket, data);
            rooms[roomUniqueId] = data;
            var dataDetail = { status: true, message: 'Your Room has been created', data: result }
            socket.emit('CREATEMATCH_RESPONSE', dataDetail);
        })
    });
    socket.on('GETFRIEND_SEND', function (userId, name) {
        var pageNo = 1;
        var dataLimit = config.dataLimit;
        name = name ? name : '';
        getFriend(userId).then((data) => {
            var onlineFriends = []
            data.map((ele) => {
                // if (userList.userSoc[ele] != undefined) {
                onlineFriends.push(ele)
                // }
            })

            return appUserService.getMultipleUserDetails(onlineFriends, name).then(async (result) => {
                if (result) {
                    let serverURL = config.getServerUrl()

                    const userDataFunction = async (user) => {
                        user['user_image'] = serverURL + config.avatarImagePath + user['user_image'];
                        return user.dataValues
                    }

                    return Promise.all(result.map(async (resData) => {
                        return await userDataFunction(resData)
                    }))
                        .then(response => {
                            var data = { status: true, data: response }
                            socket.emit('GETFRIEND_RESPONSE', data);
                        })
                }
            })
        })
    });
    socket.on('removeUser', (removeUserId, callback) => {
        //console.log("In Remove User Socket Called", removeUserId);
        //console.log("===========================================");
        var data = { status: true, message: 'You have been kicked out from the Room!' }
        socket.to(userList.userSoc[removeUserId].socketId).emit('kicked_out', data);
    });
    socket.on('REMOVE_USER_SEND', async (removeUserId, roomUniqueId, loginUserId, callback) => {
        var data;
        let getroomdetails = await roomService.getRoomById(roomUniqueId).then(result => {
            return result.dataValues;
        });
        let removeUserSocketid = !!userList.userSoc[removeUserId] && userList.userSoc[removeUserId].socketId;
        //console.log("getroomdetails ==>", getroomdetails);
        //console.log("getroomdetails._user_id ==>", getroomdetails._user_id);
        //console.log("loginUserId ==>", loginUserId);
        //console.log("removeUserSocketid ==>", removeUserSocketid);
        //console.log("userList ==>", userList);
        //console.log("userList ==>", socket);

        if (getroomdetails._user_id == loginUserId) {
            let room = rooms[roomUniqueId];
            if (!!room) {
                //console.log("room before==>", room);
                room.sockets = room.sockets.filter((item) => item.id !== removeUserSocketid);
                delete userList.userSoc[removeUserId];
                //console.log("room after==>", room);
                data = { status: true, message: 'user successfully removed !' }
            } else {
                data = { status: false, message: 'room not available !' }
            }
        } else {
            data = { status: false, message: 'you have no permission to remove this user' }
        }
        socket.emit('REMOVE_USER_RESPONSE', data);
    });

    socket.on('getRoomNames', (data, callback) => {
        socket.emit('listOfRoom', rooms);
    });
    socket.on('GETROOMMEMBER_SEND', async (roomUniqueId) => {
        var roomMembers = await geRoomMember(roomUniqueId);
        const userDataFunction = async (user) => {
            var userDetail = await getUserProfile(user)
            return userDetail.dataValues
        }

        return Promise.all(roomMembers.map(async (resData) => {
            return await userDataFunction(resData)
        }))
            .then(response => {
                console.log("responce ==>", response)
                var data = { status: true, data: response }
                //socket.emit('GETROOMMEMBER_RESPONSE', data);
                io.sockets.in(roomUniqueId).emit('GETROOMMEMBER_RESPONSE', data);
            })

    })
    socket.on('LEAVEROOMMEMBERVIEW_SEND', async (roomUniqueId, userId, screen) => {
        console.log("LEAVEROOMMEMBERVIEW_SEND ==>", roomUniqueId, userId);
        console.log("socketId ==>", socket.id);
        console.log("rooms[roomUniqueId].usersList 5555 ==>", rooms[roomUniqueId].usersList);
        if (screen === 'internet' || screen === 'game') {
            console.log("inside if =========================================");
            var resDataVal = { status: true, data: rooms[roomUniqueId].usersList, cardPack: rooms[roomUniqueId].cardPack }
            if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
                rooms[roomUniqueId].websockets.forEach((value) => {
                    console.log("websocket Id ===>", value.id)
                    io.to(value.id).emit('LEAVEROOMMEMBERWEBVIEW_RESPONSE', resDataVal);
                })
            } else {
                socket.emit('LEAVEROOMMEMBERWEBVIEW_RESPONSE', resDataVal);
            }
        } else {
            console.log("inside else =========================================");
            var roomMembers = await geRoomMember(roomUniqueId);
            var data = await roomService.getRoomById(roomUniqueId).then(async result => {
                return result.dataValues
            });
            const userDataFunction = async (user) => {
                var userDetail = await getUserProfile(user)
                return userDetail.dataValues
            }

            return Promise.all(roomMembers.map(async (resData) => {
                return await userDataFunction(resData)
            })).then(response => {

                let userLists = response;
                response.forEach((userDetail, index) => {
                    let findObject = rooms[roomUniqueId].usersList.find((item) => item.user_id === userDetail.user_id);
                    if (findObject) {
                        userLists[index].image_url = findObject.image_url
                        userLists[index].isAvailable = findObject.isAvailable
                        userLists[index].cards = findObject.cards
                        /*
                        if (!!rooms && rooms[roomUniqueId] && findObject.isAvailable === false) {
                            userLists[index].cards = []
                            findObject.cards.length > 0 && findObject.cards.forEach((cardDetail, index) => {
                                rooms[roomUniqueId].cardPack.push(cardDetail)
                            })
                        }*/
                    }
                })
                console.log('userLists 111 ==>', userLists);
                var resDataVal = { status: true, data: userLists, cardPack: rooms[roomUniqueId].cardPack }
                if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
                    rooms[roomUniqueId].websockets.forEach((value) => {
                        console.log("websocket Id ===>", value.id)
                        io.to(value.id).emit('LEAVEROOMMEMBERWEBVIEW_RESPONSE', resDataVal);
                    })
                } else {
                    socket.emit('LEAVEROOMMEMBERWEBVIEW_RESPONSE', resDataVal);
                }
            })
        }
    })
    socket.on('GETROOMMEMBERWEBVIEW_SEND', async (roomUniqueId, userId, screen) => {
        console.log("GETROOMMEMBERWEBVIEW_SEND ==>", roomUniqueId, userId);
        console.log("socketId ==>", socket.id);
        if (!!rooms && !!rooms[roomUniqueId]) {
            await removeComputerUserFromSocketList(roomUniqueId)
        }
        if (!!rooms && !!rooms[roomUniqueId]) {
            rooms[roomUniqueId].screen = screen
        }
        var roomMembers = await geRoomMember(roomUniqueId);
        var addwebsocket = await addWebSocketId(socket, userId);
        var data = await roomService.getRoomById(roomUniqueId).then(async result => {
            return result.dataValues
        });
        await joinWebRoom(socket, data)
        //console.log("roomMembers ==>", roomMembers);
        if (roomMembers.length > 1) {
            const userDataFunction = async (user) => {
                var userDetail = await getUserProfile(user)
                //console.log("userDetail ==>", userDetail);
                return userDetail.dataValues
            }

            return Promise.all(roomMembers.map(async (resData) => {
                return await userDataFunction(resData)
            })).then(response => {
                console.log("Response Data =============", response)
                var resDataVal = { status: true, data: response, roomDelete: false }
                //console.log("rooms ==>", rooms)
                if (!!rooms && rooms[roomUniqueId]) {
                    rooms[roomUniqueId].usersList = response;
                }
                //console.log("resDataVal ==>", resDataVal)
                console.log("websockets ==>", rooms[roomUniqueId].websockets)
                if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
                    rooms[roomUniqueId].websockets.forEach((value) => {
                        console.log("websocket Id ===>", value.id)
                        io.to(value.id).emit('GETROOMMEMBERWEBVIEW_RESPONSE', resDataVal);
                    })
                } else {
                    socket.emit('GETROOMMEMBERWEBVIEW_RESPONSE', resDataVal);
                }
            })
        } else {
            console.log("In Else Condition");
            var data = { status: true, message: 'delete a room', roomDelete: true }
            if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
                console.log("In Else If Condition")
                rooms[roomUniqueId].websockets.forEach((value) => {
                    io.to(value.id).emit('GETROOMMEMBERWEBVIEW_RESPONSE', data);
                })
            } else {
                console.log("In Else Else Condition")
                socket.emit('GETROOMMEMBERWEBVIEW_RESPONSE', data);
            }

        }

    })
    socket.on('INVITEFRIEND_SEND', (data) => {
        var details = { _user_id: data.user_id, _friend_id: data.friend_id, _room_id: data.room_id, _room_unique_id: data.room_unique_id, _room_code: data.room_code };
        var friendidArray = details._friend_id.split(',');
        var status;
        const inviteFriendFunction = (resDataItem) => {
            details._friend_id = resDataItem;
            return inviteService.addInvitation(details, resDataItem).then(async (result) => {
                if (result.status) {
                    status = true
                    if (userList.userSoc[resDataItem] != undefined) {
                        socket.to(userList.userSoc[resDataItem].socketId).emit('NOTIFICATION');
                    }
                }
                return result;
            });
        }

        return Promise.all(friendidArray.map(friendData => inviteFriendFunction(friendData)))
            .then(data => {
                if (data) {
                    if (data.length > 1) {
                        if (status) {
                            var response = { status: true, message: "Success! Request send successfully!" }
                            socket.emit('INVITEFRIEND_RESPONSE', response);
                        }
                        else {
                            var response = { status: false, message: "You already send a request to this user!" }
                            socket.emit('INVITEFRIEND_RESPONSE', response);
                        }
                    }
                    else {
                        socket.emit('INVITEFRIEND_RESPONSE', data[0]);
                    }
                }
            })
    })
    socket.on('rejectInvitation', async (inviterId, userId) => {
        var inviter = await getUserProfile(inviterId);
        var user = await getUserProfile(userId)
        var dataDetail = { status: true, message: user.dataValues.name + ' reject your invitation', user: user.dataValues, inviter: inviter.dataValues }
        socket.to(userList.userSoc[inviterId].socketId).emit('rejectInvitationNotification', dataDetail);
    })
    socket.on('SENDFRIENDREQUEST_SEND', (data) => {
        data._friend_id = (data._friend_id) * 1;
        data._user_id = (data._user_id) * 1;
        return friendRequestService.sendRequest(friendRequestDetails).then(async result => {
            if (userList.userSoc[data._friend_id] != undefined) {
                socket.to(userList.userSoc[data._friend_id].socketId).emit('NOTIFICATION');
            }
            socket.emit('SENDFRIENDREQUEST_RESPONSE', result);
        });
    })

    // socket.on('joinRoom', (roomId, callback) => {
    //     const room = rooms[roomId];
    //     return roomService.getRoomById(roomId).then(async result => {
    //         if (result) {
    //             if (result.dataValues.max_player <= room.sockets.length) {
    //                 socket.emit('JOINPRIVATEROOM_RESPONSE', 'The room is full!');
    //             } else {
    //                 await joinRoom(socket, room);
    //             }
    //         }
    //     })
    // });

    socket.on('GETROOMDETAILS_SEND', (roomId, callback) => {
        return roomService.getRoomById(roomId).then(async result => {
            if (result) {
                var user = await getUserProfile(result.dataValues._user_id)
                var data = { status: true, data: result.dataValues, user: user }
                socket.emit('GETROOMDETAILS_RESPONSE', data);
            } else {
                var data = { status: false, message: 'No such a room found' }
                socket.emit('GETROOMDETAILS_RESPONSE', data);
            }
        })
    });
    // socket.on('JOINPRIVATEROOM_SEND', (roomId, code, inviteId, callback) => {
    //     const room = rooms[roomId];
    //     console.log(roomId, code)
    //     return roomService.getRoomById(roomId).then(result => {
    //         if (result) {
    //             var dataDetail = {};
    //             if (result.dataValues.max_player <= room.sockets.length) {
    //                 dataDetail.invite_status = 'rejected';
    //                 var data = { status: false, message: 'The room is full!' }
    //                 socket.emit('JOINPRIVATEROOM_RESPONSE', data);
    //             }
    //             else if (result.dataValues.room_code !== code) {
    //                 dataDetail.invite_status = 'rejected';
    //                 var data = { status: false, message: 'You entered wrong code' }
    //                 socket.emit('JOINPRIVATEROOM_RESPONSE', data);
    //             }
    //             else {
    //                 dataDetail.invite_status = 'accepted';
    //                 joinRoom(socket, room);
    //             }
    //             return inviteService.updateInvitationById(dataDetail, {
    //                 returning: true, where: { invite_id: inviteId }
    //             })
    //         } else {
    //             var data = { status: false, message: 'No such a room found' }
    //             socket.emit('JOINPRIVATEROOM_RESPONSE', data);
    //         }

    //     })
    // });
    socket.on('JOINPRIVATEROOM_SEND', (roomId, code, inviteId, loginUserId, callback) => {
        const room = rooms[roomId];
        console.log(roomId, code)
        console.log("loginUserId ==>", loginUserId);
        console.log("socket ==>", socket.id);
        return roomService.getRoomById(roomId).then(result => {
            console.log("result ==>", result);
            let roomGameStart = false;
            if (!!room.gameStart) {
                roomGameStart = room.gameStart;
            }
            if (roomGameStart === true) {
                let data = { status: false, message: 'Game is already started in this room' }
                socket.emit('JOINPRIVATEROOM_FAILURE', data)
            } else {
                if (result) {
                    var dataDetail = {};
                    if (result.dataValues.max_player <= room.sockets.length) {
                        dataDetail.invite_status = 'rejected';
                        var data = { status: false, message: 'The room is full!' }
                        socket.emit('JOINPRIVATEROOM_RESPONSE', data);
                    }
                    else if (result.dataValues.room_code !== code) {
                        dataDetail.invite_status = 'rejected';
                        var data = { status: false, message: 'You entered wrong code' }
                        socket.emit('JOINPRIVATEROOM_RESPONSE', data);
                    }
                    else {
                        dataDetail.invite_status = 'accepted';
                        userList.addUser(loginUserId, socket); // update new socketId in room
                        console.log('userList new join 11 >>', userList)
                        joinRoom(socket, room);
                    }
                    return inviteService.updateInvitationById(dataDetail, {
                        returning: true, where: { invite_id: inviteId }
                    })
                } else {
                    var data = { status: false, message: 'No such a room found' }
                    socket.emit('JOINPRIVATEROOM_RESPONSE', data);
                }
            }
        })
    });
    // socket.on('JOINPRIVATEROOMWITHCODE_SEND', (code, callback) => {
    //     console.log(code)
    //     return roomService.getRoomByCode(code).then(result => {
    //         if (result) {
    //             const room = rooms[result.dataValues.room_unique_id];
    //             code = parseInt(code)
    //             if (result.dataValues.max_player <= room.sockets.length) {
    //                 var data = { status: false, message: 'The room is full!' }
    //                 socket.emit('JOINPRIVATEROOM_RESPONSE', data);
    //             }
    //             else {
    //                 joinRoom(socket, room);
    //             }
    //         } else {
    //             var data = { status: false, message: 'No such a room found ,please enter valid Code!' }
    //             socket.emit('JOINPRIVATEROOM_RESPONSE', data);
    //         }

    //     })
    // });
    socket.on('JOINPRIVATEROOMWITHCODE_SEND', (code, loginUserId, callback) => {
        console.log(code)
        console.log("loginUserId ==>", loginUserId);
        console.log("socket ==>", socket.id);

        return roomService.getRoomByCode(code).then(result => {
            if (result) {
                const room = rooms[result.dataValues.room_unique_id];
                let roomGameStart = false;
                if (room.gameStart) {
                    roomGameStart = room.gameStart;
                }
                if (roomGameStart === true) {
                    let data = { status: false, message: 'Game is already started in this room' }
                    socket.emit('JOINPRIVATEROOM_FAILURE', data)
                } else {
                    code = parseInt(code)
                    if (result.dataValues.max_player <= room.sockets.length) {
                        var data = { status: false, message: 'The room is full!' }
                        socket.emit('JOINPRIVATEROOM_RESPONSE', data);
                    } else {
                        userList.addUser(loginUserId, socket); // update new socketId in room
                        console.log('userList new join 22 >>', userList)
                        joinRoom(socket, room);
                    }
                }

            } else {
                var data = { status: false, message: 'No such a room found ,please enter valid Code!' }
                socket.emit('JOINPRIVATEROOM_RESPONSE', data);
            }

        })
    });
    socket.on('CARDPACK_FOR_ALL_USERS_SEND', async (card, roomUniqueId) => {
        console.log("================= CARDPACK_FOR_ALL_USERS_SEND =========================")
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                console.log("websocket Id ====>>>>>", value.id)
                io.to(value.id).emit('CARDPACK_FOR_ALL_USERS_RESPONSE', card);
            })
        } else {
            socket.emit('CARDPACK_FOR_ALL_USERS_RESPONSE', card);
        }
    });
    socket.on('GAME_WINNER_SEND', async (roomUniqueId) => {
        if (!!rooms && rooms[roomUniqueId]) {
            console.log("GAME_WINNER_SEND usersList ==>", rooms[roomUniqueId].usersList)
            console.log("GAME_WINNER_SEND room ==>", rooms[roomUniqueId])
            rooms[roomUniqueId].websockets = [];
            var roomMembers = await geRoomMember(roomUniqueId);
            const userDataFunction = async (user) => {
                var userDetail = await getUserProfile(user)
                return userDetail.dataValues
            }

            return Promise.all(roomMembers.map(async (resData) => {
                return await userDataFunction(resData)
            }))
                .then(response => {
                    console.log("responce ==>", response)
                    var data = { status: true, data: rooms[roomUniqueId].usersList, roomUniqueId: roomUniqueId }
                    io.sockets.in(roomUniqueId).emit('GAME_WINNER_RESPONSE', data);
                })
        }
    });
    socket.on('CARD_DISTRIBUTION_SEND', (cardArrayList, usersListValues, roomUniqueId) => {

        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].cardPack = cardArrayList;
            rooms[roomUniqueId].usersList = usersListValues;
        }
        //console.log("CARD_DISTRIBUTION_SEND==>", rooms)
        var data = {
            cardArrayList: cardArrayList,
            usersListValues: usersListValues
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                console.log("websocket Id", value.id)
                io.to(value.id).emit('CARD_DISTRIBUTION_RESPONSE', data);
            })
        } else {
            socket.emit('CARD_DISTRIBUTION_RESPONSE', data);
        }
    });
    socket.on('GAME_WAITING_START_SEND', async (roomUniqueId) => {
        console.log("GAME_WAITING_START_SEND")
        lostInternet = [];
        var roomMembers = await geRoomMember(roomUniqueId);
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].gameStart = true;
        }
        const userDataFunction = async (user) => {
            var userDetail = await getUserProfile(user)
            return userDetail.dataValues
        }

        return Promise.all(roomMembers.map(async (resData) => {
            return await userDataFunction(resData)
        }))
            .then(response => {
                var data = { status: true, data: response }
                io.sockets.in(roomUniqueId).emit('GAME_WAITING_START_RESPONSE', data);
            })
    });
    socket.on('GAME_START_SEND', (roomUniqueId) => {
        console.log("GAME_START_SEND")
        var data = {
            room_id: roomUniqueId
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                console.log("websocket Id", value.id)
                io.to(value.id).emit('GAME_START_RESPONSE', data);
            })
        } else {
            socket.emit('GAME_START_RESPONSE', data);
        }
    });

    socket.on('FIRST_CARD_OPEN_SEND', (cardPack, cardPackOpen, roomUniqueId) => {
        console.log("FIRST_CARD_OPEN_SEND");
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].cardPackOpen = cardPackOpen;
            rooms[roomUniqueId].cardPack = cardPack;
        }
        var data = {
            room_id: roomUniqueId,
            cardPackOpen: cardPackOpen,
            cardPack: cardPack
        }
        //console.log("FIRST_CARD_OPEN_SEND==>", rooms)
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('FIRST_CARD_OPEN_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('FIRST_CARD_OPEN_RESPONSE', data);
        }
    });

    socket.on('GAME_START_DIRECTION_SEND', (gemeStartDirection, roomUniqueId) => {
        console.log("GAME_START_DIRECTION_SEND");
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].gemeStartDirection = gemeStartDirection;
        }
        var data = {
            gemeStartDirection: gemeStartDirection,
        }
        console.log("CURRENT_ACTIVE_USER_IN_GAME_SEND==>", rooms)
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('GAME_START_DIRECTION_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('GAME_START_DIRECTION_RESPONSE', data);
        }
    });

    socket.on('CURRENT_ACTIVE_USER_IN_GAME_SEND', (currentActiveUser, roomUniqueId) => {
        console.log("CURRENT_ACTIVE_USER_IN_GAME_SEND");
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].currentActiveUserInGame = currentActiveUser;
        }
        var data = {
            currentActiveUserInGame: currentActiveUser,
            roomUniqueId: roomUniqueId
        }
        //console.log("CURRENT_ACTIVE_USER_IN_GAME_SEND==>", rooms)
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('CURRENT_ACTIVE_USER_IN_GAME_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('CURRENT_ACTIVE_USER_IN_GAME_RESPONSE', data);
        }
    });

    socket.on('START_ACTIVE_USER_TIMER_SEND', (roomUniqueId) => {
        console.log("======= START_ACTIVE_USER_TIMER_SEND =============");
        var data = {
            status: true
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('START_ACTIVE_USER_TIMER_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('START_ACTIVE_USER_TIMER_RESPONSE', data);
        }
    });
    socket.on('ACTIVE_COMPUTER_USER_CARD_SEND_MACHE_CARD_SEND', async (card, roomUniqueId, userId) => {
        //console.log("In Active Computer User Card Send Mache card", card, userList.userWebViewSoc[userId].socketId)
        //console.log("UsersList Websocket", userList.userWebViewSoc);
        var data = {
            status: true,
            card: card,
            usersList: rooms[roomUniqueId].usersList
        }

        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('ACTIVE_COMPUTER_USER_CARD_SEND_MACHE_CARD_RESPONSE', data);
                //socket.to(value.id).broadcast.emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_RESPONSE', data);
                //io.sockets.in(userList.userWebViewSoc[userId].socketId).emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('ACTIVE_COMPUTER_USER_CARD_SEND_MACHE_CARD_RESPONSE', data);
        }
        //io.to(userList.userWebViewSoc[userId].socketId).emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_RESPONSE', data);
        //socket.broadcast.emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_RESPONSE', data);
    });
    socket.on('ACTIVE_USER_CARD_SEND_MACHE_CARD_SEND', (card, roomUniqueId) => {
        console.log("In Active User Card Send Mache card")
        var data = {
            status: true,
            card: card,
            usersList: rooms[roomUniqueId].usersList
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_RESPONSE', data);
        }
    });
    socket.on('CARD_PICK_BY_COMPUTER_SEND', (cardPackOpen, usersList, currentActiveUserInGameIndex, macheCardIndex, roomUniqueId) => {

        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].cardPackOpen = cardPackOpen;
            rooms[roomUniqueId].usersList = usersList;
        }
        var data = {
            status: true,
            cardPackOpen: cardPackOpen,
            usersList: rooms[roomUniqueId].usersList,
            roomUniqueId: roomUniqueId
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('CARD_PICK_BY_COMPUTER_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('CARD_PICK_BY_COMPUTER_RESPONSE', data);
        }
    });
    socket.on('CARD_PICK_BY_USER_SEND', (cardPackOpen, usersList, currentActiveUserInGameIndex, macheCardIndex, roomUniqueId) => {
        console.log("In CARD_PICK_BY_USER_SEND")
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].cardPackOpen = cardPackOpen;
            rooms[roomUniqueId].usersList = usersList;
        }
        var data = {
            status: true,
            cardPackOpen: cardPackOpen,
            usersList: usersList
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('CARD_PICK_BY_USER_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('CARD_PICK_BY_USER_RESPONSE', data);
        }
    });

    socket.on('ACTIVE_USER_CARD_CATCH_FROM_CARDPACK_SEND', (card, cardIndex, roomUniqueId) => {
        var data = {
            status: true,
            card: card,
            cardIndex: cardIndex
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                console.log("websocket Id", value.id)
                console.log("=======================================================")
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('ACTIVE_USER_CARD_CATCH_FROM_CARDPACK_RESPONSE', data);
                //}
            })
        } else {
            console.log("Inside Else")
            console.log("=======================================================")
            socket.emit('ACTIVE_USER_CARD_CATCH_FROM_CARDPACK_RESPONSE', data);
        }
    });

    socket.on('CARD_PACK_UPDATE_SEND', (cardPack, usersList, roomUniqueId) => {
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].cardPack = cardPack;
            rooms[roomUniqueId].usersList = usersList;
        }
        var data = {
            status: true,
            cardPack: cardPack,
            usersList: usersList
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('CARD_PACK_UPDATE_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('CARD_PACK_UPDATE_RESPONSE', data);
        }
    });
    socket.on('SKIP_COMPUTER_TURN_SEND', (usersList, cardPack, roomUniqueId) => {
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].usersList = usersList;
            rooms[roomUniqueId].cardPack = cardPack;
        }
        var data = {
            status: true,
            usersList: usersList,
            cardPack: cardPack
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('SKIP_COMPUTER_TURN_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('SKIP_COMPUTER_TURN_RESPONSE', data);
        }
    });
    socket.on('SKIP_USER_TURN_SEND', (usersList, cardPack, roomUniqueId) => {
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].usersList = usersList;
            rooms[roomUniqueId].cardPack = cardPack;
        }
        var data = {
            status: true,
            usersList: usersList,
            cardPack: cardPack
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('SKIP_USER_TURN_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('SKIP_USER_TURN_RESPONSE', data);
        }
    });
    socket.on('ACTIVE_COMPUTER_USER_CARD_NOT_MACHE_SEND', (card, roomUniqueId) => {
        var data = {
            status: true,
            card: card
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('ACTIVE_COMPUTER_USER_CARD_NOT_MACHE_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('ACTIVE_COMPUTER_USER_CARD_NOT_MACHE_RESPONSE', data);
        }
    });
    socket.on('ACTIVE_USER_CARD_NOT_MACHE_SEND', (card, roomUniqueId) => {
        var data = {
            status: true,
            card: card
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('ACTIVE_USER_CARD_NOT_MACHE_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('ACTIVE_USER_CARD_NOT_MACHE_RESPONSE', data);
        }
    });
    socket.on('SET_LAST_CARD_IN_COMPUTER_USER_SEND', (usersList, roomUniqueId) => {
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].usersList = usersList;
        }
        var data = {
            status: true,
            usersList: usersList
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('SET_LAST_CARD_IN_COMPUTER_USER_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('SET_LAST_CARD_IN_COMPUTER_USER_RESPONSE', data);
        }
    });
    socket.on('SET_LAST_CARD_IN_CURRENT_USER_SEND', (usersList, roomUniqueId) => {
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].usersList = usersList;
        }
        var data = {
            status: true,
            usersList: usersList
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('SET_LAST_CARD_IN_CURRENT_USER_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('SET_LAST_CARD_IN_CURRENT_USER_RESPONSE', data);
        }
    });
    socket.on('IMMIDIATE_WIN_GAME_PENALTY_SEND', (cardPack, usersList, roomUniqueId) => {
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].usersList = usersList;
            rooms[roomUniqueId].cardPack = cardPack;
        }
        var data = {
            status: true,
            usersList: usersList,
            cardPack: cardPack
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('IMMIDIATE_WIN_GAME_PENALTY_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('IMMIDIATE_WIN_GAME_PENALTY_RESPONSE', data);
        }
    });
    socket.on('ADD_CARDS_IN_CARDPACK_FROM_OPENCARDPACK_SEND', (cardPack, cardPackOpen, roomUniqueId) => {
        if (!!rooms && rooms[roomUniqueId]) {
            rooms[roomUniqueId].cardPack = cardPack;
            rooms[roomUniqueId].cardPackOpen = cardPackOpen;
        }
        var data = {
            status: true,
            cardPack: cardPack,
            cardPackOpen: cardPackOpen
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('ADD_CARDS_IN_CARDPACK_FROM_OPENCARDPACK_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('ADD_CARDS_IN_CARDPACK_FROM_OPENCARDPACK_RESPONSE', data);
        }
    });
    socket.on('RESTART_GAME_SEND', (roomUniqueId) => {
        var data = {
            status: true
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('RESTART_GAME_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('RESTART_GAME_RESPONSE', data);
        }
    });

    socket.on('EMOJI_REACT_SEND', (userDetail, emojiEvent, roomUniqueId) => {
        var data = {
            status: true,
            emojiEvent: emojiEvent,
            userDetail: userDetail
        }

        io.sockets.in(roomUniqueId).emit('EMOJI_REACT_RESPONSE', data);
        // if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
        //     rooms[roomUniqueId].websockets.forEach((value) => {
        //         //console.log("websocket Id", value.id)
        //         //if (socket.id !== value.id) {
        //         io.to(value.id).emit('EMOJI_REACT_RESPONSE', data);
        //         //}
        //     })
        // } else {
        //     socket.emit('EMOJI_REACT_RESPONSE', data);
        // }
    })

    socket.on('DARW_COMPUTER_CARDS_WHEN_CARD_2_NOT_AVAILABLE_SEND', (drawCardCount, roomUniqueId) => {
        var data = {
            status: true,
            drawCardCount: drawCardCount
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('DARW_COMPUTER_CARDS_WHEN_CARD_2_NOT_AVAILABLE_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('DARW_COMPUTER_CARDS_WHEN_CARD_2_NOT_AVAILABLE_RESPONSE', data);
        }
    });

    socket.on('DARW_CARDS_WHEN_CARD_2_NOT_AVAILABLE_SEND', (drawCardCount, roomUniqueId) => {
        var data = {
            status: true,
            drawCardCount: drawCardCount
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('DARW_CARDS_WHEN_CARD_2_NOT_AVAILABLE_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('DARW_CARDS_WHEN_CARD_2_NOT_AVAILABLE_RESPONSE', data);
        }
    });

    socket.on('IMMIDIATE_WIN_GAME_SEND', (cardCount, getLastUser, roomUniqueId) => {
        var data = {
            status: true,
            cardCount: cardCount,
            getLastUser: getLastUser,
            roomUniqueId: roomUniqueId
        }
        if (rooms[roomUniqueId] && rooms[roomUniqueId].websockets) {
            rooms[roomUniqueId].websockets.forEach((value) => {
                //console.log("websocket Id", value.id)
                //if (socket.id !== value.id) {
                io.to(value.id).emit('IMMIDIATE_WIN_GAME_RESPONSE', data);
                //}
            })
        } else {
            socket.emit('IMMIDIATE_WIN_GAME_RESPONSE', data);
        }
    });

    socket.on('ROUND_OVER_RESULT_SEND', async (resultData, round, roomUniqueId) => {
        console.log("ROUND_OVER_RESULT_SEND---------------------------------------->");
        // call this socket one time 
        console.log("resultData ==>", resultData);
        console.log("resultData ==>", resultData.length);
        console.log("roomUniqueId ==>", roomUniqueId);
        let getroomdetails = await roomService.getRoomById(roomUniqueId).then(result => {
            return result.dataValues;
        });

        return Promise.all(resultData.map(async (resData) => {
            return await addResult(resData, round, getroomdetails)
        }))
            .then(response => {
                let res = {
                    dbResponse: response,
                    resultData: resultData
                }
                console.log("responce ==>", response)
                var data = { status: true, message: "Success! Result added successfully!", data: res }
                io.sockets.in(roomUniqueId).emit('ROUND_OVER_RESULT_RESPONSE', data);
            })
    });

    socket.on('ROUND_OVER_MANAGE_RESULT_STATUS_SEND', async (status, round, userId, roomUniqueId) => {
        // call this socket one time 
        console.log("ROUND_OVER_MANAGE_RESULT_STATUS_SEND ==>", status + " " + round + " " + userId + " " + roomUniqueId);
        
        var data = {
            next_game_status: status
        }
        return resultService.updateResult(data, {
            returning: true, where: {  _room_unique_id: roomUniqueId,  _user_id: userId, round: round}
        }).then(async result => {
            if(result){
                console.log("ROUND_OVER_MANAGE_RESULT_STATUS_SEND ==>  INSIDE UPDATE RESULT")
            await resultService.getCurrentRoundResultByRoomId({ room_unique_id: roomUniqueId, round: round}).then(responseData =>{
                if(responseData){
                    console.log("ROUND_OVER_MANAGE_RESULT_STATUS_SEND ==>  INSIDE GET RESULT")
                    let serverURL = config.getServerUrl()
                    const userDataFunction = async (user) => {
                        let imagePath;
                        if (user.user_detail.user_image === 'default.png') {
                            imagePath = serverURL + config.avatarImagePath + user.user_detail.user_image;
                        } else {
                            imagePath = serverURL + config.appUserImagePath + user.user_detail.user_image
                        }
                        user.user_detail.user_image = imagePath;
                        return user.dataValues
                    }

                    return Promise.all(responseData.map(async (resData) => {
                        return await userDataFunction(resData)
                    }))
                        .then(response => {
                            var data = { status: true, data: response }
                            console.log("ROUND_OVER_MANAGE_RESULT_STATUS_SEND ==> RESULT" + data)
                            io.sockets.in(roomUniqueId).emit('ROUND_OVER_MANAGE_RESULT_STATUS_RESPONSE', data);
                        })
                }
             })
        }
        })
    });

    socket.on('LAST_ROUND_WINNER_DETAILS_SEND', (roomUniqueId, round) => {
        setObject = {
            'room_unique_id' : roomUniqueId,
	        'round' : round - 1
        }
        console.log("LAST_ROUND_WINNER_DETAILS_SEND" + setObject)
        return resultService.getLastRoundWinnerByRoomId(setObject).then(async result => {
            if (result) {
                console.log("LAST_ROUND_WINNER_DETAILS_SEND object result" + result)
                console.log("LAST_ROUND_WINNER_DETAILS_SEND userid" + result.dataValues._user_id)
                console.log("LAST_ROUND_WINNER_DETAILS_SEND points" + result.dataValues.points)
                var user = await getUserProfile(result.dataValues._user_id)
                console.log("LAST_ROUND_WINNER_DETAILS_SEND  user" , user)
                var data = { status: true, data: result.dataValues, user: user }
                socket.emit('LAST_ROUND_WINNER_DETAILS_RESPONSE', data);
            } else {
                var data = { status: false, message: 'No such a user found' }
                socket.emit('LAST_ROUND_WINNER_DETAILS_RESPONSE', data);
            }
        })
    });

    socket.on('LEAVEROOM_SEND', (userId, screen) => {
        console.log('--------------leaved-----------------')
        var screenData = (!!screen) ? screen : ''; // default `waiting`
        leaveRooms(socket, userId, screenData);
        var data = { status: true, message: 'leaved a room' }
        socket.emit('LEAVEROOM_RESPONSE', data);
    });
    socket.on('CLOSEGAME_SEND', () => {
        closeGameRooms(socket);
        var data = { status: true, message: 'delete a room' }
        socket.emit('DELETEROOM_RESPONSE', data);
    });
    socket.on('DISCONNECT', function (reason) {
        console.log("DISCONNECT ===>", socket.id)
        var offlineId = userList.removeUser(socket)

    });
});

// module.exports = {
//     getUserFriendRequest
// }

//app.listen(8080);
app.listen(5050);