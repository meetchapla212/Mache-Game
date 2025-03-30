const inviteMaster = require('../models/invite_master').inviteMaster;
var Sequelize = require('sequelize');
const userMaster = require('../models/app_users_master').userMaster;
const roomMaster = require('../models/room').roomMaster;
const sequelize = require('../db');
const moment = require('moment');

const addInvitation = (data, _friend_id) => inviteMaster.findOne({
    where: {
        _user_id: data._user_id,
        _friend_id: _friend_id,
        _room_id: data._room_id,
        invite_status: 'pending'
    }
}).then(function (device) {
    data._friend_id = _friend_id;
    if (!device) {
        return inviteMaster.create({
            ...data
        }).then((result) => {
            var response = { status: true, message: "Success! Invited successfully!", data: result }
            return response;
        }).catch((error) => {
            var response = { status: false, message: "Error! Invalid data found", error }
            return response;
        });
    }
    else {
        var response = { status: false, message: "You already send a request to this user!" }
        return response;
    }
}).catch((error) => {
    console.log('error', error)
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});

const getInvitationById = (id) => {
    var query = {
        where: {
            invite_id: id
        },
    };
    return inviteMaster.findOne(query).then(sequelize.getValues)
};

const updateInvitationById = (data, query) => {
    return inviteMaster.update(data, query).then(function ([rowsUpdate, [updatedInvitation]]) {
        return updatedInvitation;
    })
};

const getUserAcceptedInvitation = (friendId) => {
    var query = {
        where: {
            _friend_id: friendId,
            invite_status: 'pending',
            is_delete: 0
        },
        include: [
            {
                model: userMaster,
                as: 'app_users',
                attributes: [
                    'name',
                    'user_image'
                ],
            },
            {
                model: roomMaster,
                as: 'room_detail',
                where: {
                    available: 0
                }
            }
        ],
    };
    return inviteMaster.findAll(query).then(sequelize.getValues)
};

const getPendingInvitation = (friendId) => {
    var query = {
        where: {
            _friend_id: friendId,
            invite_status: 'pending',
            is_delete: 0
        },
        include: [
            {
                model: userMaster,
                as: 'app_users',
                attributes: [
                    'name',
                    'user_image'
                ],
            }
        ],
    };
    return inviteMaster.findAll(query).then(sequelize.getValues)
};

const getCompleteRequestForUser = (userId) => {
    var query = {
        where: {
            _user_id: userId,
            invite_status: 'rejected',
            is_delete: 0,
            is_read: 0
        },
        include: [
            {
                model: userMaster,
                as: 'friend_users',
                attributes: [
                    'name',
                    'user_image'
                ],
            }
        ],
        order: [['invite_id', 'DESC']]
    };

    return inviteMaster.findAll(query).then(sequelize.getValues)
};

function getInvitationByRoomUniqueId(room_unique_id) {
    console.log(" room_unique_id ", room_unique_id);
    var query = {
        where: {
            _room_unique_id: room_unique_id,
            is_delete: 0,
            is_read: 0
        }
    };
    return inviteMaster.findAll(query).then(sequelize.getValues)
}

module.exports = {
    addInvitation,
    updateInvitationById,
    getInvitationById,
    getUserAcceptedInvitation,
    getCompleteRequestForUser,
    getPendingInvitation,
    getInvitationByRoomUniqueId
}