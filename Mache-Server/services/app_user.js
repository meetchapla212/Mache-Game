const userMaster = require('../models/app_users_master').userMaster;
const sequelize = require('../db');
const config = require('../config');
const CustomError = require('../customError');
var Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
var crypto = require('crypto');

const checkEmailExist = email_id => userMaster.findOne({
    where: { email_id, is_delete: 0 }
});
const checkUsernameExist = username => userMaster.findOne({
    where: { username, is_delete: 0 }
});
const checkEmailExistForUpdate = (email_id, user_id) => userMaster.findOne({
    where: { email_id, is_delete: 0, user_id: { [Sequelize.Op.ne]: user_id } }
});
const checkUsernameExistForUpdate = (username, user_id) => userMaster.findOne({
    where: { username, is_delete: 0, user_id: { [Sequelize.Op.ne]: user_id } }
});
const checkAccountIdExist = account_id => userMaster.findOne({
    where: { account_id, is_delete: 0 }
});

const authenticate = params => {
    return userMaster.findOne({
        where: {
            email_id: params.email_id,
            is_delete: 0
        },
        raw: true
    }).then(user => {
        if (!user)
            throw new CustomError('Account not Found!');
        if (user.login_type != 'normal') {
            throw new CustomError('Account must be normal!')
        }
        if (user.user_status)
            throw new CustomError('Your account is blocked!');
        const password = crypto.createHmac('sha256', config.jwtSecret).update(params.password).digest('hex');
        if (user.password !== password)
            throw new CustomError('Invalid Password.')

        const payload = {
            name: user.name,
            username: user.username,
            email_id: user.email_id,
            id: user.user_id,
            time: new Date()
        };

        var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.appTokenExpireTime
        });
        var appUserDetails = {};
        appUserDetails.user_id = (user.user_id) ? user.user_id : 0;
        appUserDetails.name = (user.name) ? user.name : '';
        appUserDetails.nickname = (user.nickname) ? user.nickname : '';
        appUserDetails.user_image = (user.user_image) ? user.user_image : 'default.png';
        appUserDetails.username = (user.username) ? user.username : '';
        appUserDetails.email_id = (user.email_id) ? user.email_id : '';
        appUserDetails.settings = (user.settings) ? JSON.parse(user.settings) : null;
        appUserDetails.login_type = (user.login_type) ? user.login_type : "";
        appUserDetails.is_friend_request_allow = user.is_friend_request_allow;
        appUserDetails.is_game_invitation_allow = user.is_game_invitation_allow;
        appUserDetails.is_leaderboards_allow = user.is_leaderboards_allow;
        appUserDetails.is_sound_effect_allow = user.is_sound_effect_allow;
        appUserDetails.is_background_music_allow = user.is_background_music_allow;
        return { token: token, data: appUserDetails };
    });
}

const authenticateFacebook = params => {
    return userMaster.findOne({
        where: {
            account_id: params.account_id,
        },
    }).then(user => {
        if (!user)
            throw new CustomError('Facebook account not Found!');
        if (user.user_status)
            throw new CustomError('Your account is blocked!');
        const payload = {
            name: user.name,
            username: user.username,
            email_id: user.email_id,
            id: user.user_id,
            time: new Date()
        };

        var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.appTokenExpireTime
        });
        var appUserDetails = {};
        appUserDetails.account_id = (user.account_id) ? user.account_id : ''
        appUserDetails.user_id = (user.user_id) ? user.user_id : 0;
        appUserDetails.name = (user.name) ? user.name : '';
        appUserDetails.nickname = (user.nickname) ? user.nickname : '';
        appUserDetails.user_image = (user.user_image) ? user.user_image : 'default.png';
        appUserDetails.username = (user.username) ? user.username : '';
        appUserDetails.email_id = (user.email_id) ? user.email_id : '';
        appUserDetails.settings = (user.settings) ? JSON.parse(user.settings) : null;
        appUserDetails.login_type = (user.login_type) ? user.login_type : "";
        appUserDetails.is_friend_request_allow = user.is_friend_request_allow;
        appUserDetails.is_game_invitation_allow = user.is_game_invitation_allow;
        appUserDetails.is_leaderboards_allow = user.is_leaderboards_allow;
        appUserDetails.is_sound_effect_allow = user.is_sound_effect_allow;
        appUserDetails.is_background_music_allow = user.is_background_music_allow;
        return { token: token, data: appUserDetails };
    });
}



const registerUser = data => userMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! User added successfully!", data: result }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});

const getUserDetails = (id) => {
    const query = {
        where: {
            user_id: id,
        },
        attributes: [
            'login_type', 'user_id', 'nickname', 'name', 'username', 'email_id', 'user_image', 'settings', 'user_status','is_friend_request_allow','is_game_invitation_allow','is_leaderboards_allow','is_sound_effect_allow','is_background_music_allow'
        ]
    };
    return userMaster.findOne(query).then(sequelize.getValues)
};

const updateUserProfile = (data, userId) => {
    const query = {
        returning: true,
        where: {
            user_id: userId,
        }
    };
    return userMaster.update(data, query)
        .then(
            ([affectedCount, [updatedUser]]) => {
                if (affectedCount > 0) {
                    return { status: true, message: "Profile update successfully!", data: updatedUser }
                }
                return { status: false, message: "Something went wrong! Please try again!" }
            }
        ).catch(err => {
            console.log('====', err)
        })
}

const getUserByEmail = (email) => {
    const query = {
        where: {
            login_type: 'normal',
            email_id: email,
            user_status: 0
        },
    };
    return userMaster.findOne(query).then(sequelize.getValues)
};

const getSuggestionFriend = (pageNo, dataLimit, data, userId) => {
    var whereStatement = {};
    whereStatement.is_delete = 0;
    whereStatement.user_status = 0
    whereStatement.user_id = {
                [Sequelize.Op.not]: userId
            }
    // future use-----------
    // if (friendArray)
    //     whereStatement.user_id = {
    //         [Sequelize.Op.not]: friendArray
    //     }
    if (data.name) {
        whereStatement.name = {
            [Sequelize.Op.iLike]: `%${data.name}%`
        }
    }
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: whereStatement,
        attributes: ['user_id', 'name', 'username', 'email_id', 'user_image'],
        offset: offset,
        limit: dataLimit,
        order: [['user_id', 'DESC']]
    };

    return userMaster.findAll(query).then(sequelize.getValues)
};
const getAllUsers = (pageNo, dataLimit, user_id) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0,
            user_status: 0,
            user_id: { [Sequelize.Op.ne]: user_id }
        },
        attributes: ['user_id', 'name', 'username', 'email_id', 'user_image'],
        offset: offset,
        limit: dataLimit,
        order: [['user_id', 'DESC']]
    };

    return userMaster.findAll(query).then(sequelize.getValues)
};

const getUserName = (data) => {
    var whereStatement = {};
    whereStatement.is_delete = 0;
    whereStatement.user_status = 0;
    if (data.name && data.name != '') {
        whereStatement.name = {
            [Sequelize.Op.iLike]: `%${data.name}%`
        }
    }
    const query = {
        where: whereStatement,
        attributes: [
            'user_id', 'name'
        ]
    };
    return userMaster.findAll(query).then(sequelize.getValues)
}

const getMultipleUserDetails = (friendArray, name) => {
    const query = {
        where: {
            user_id: {
                [Sequelize.Op.in]: friendArray
            },
            name: {
                [Sequelize.Op.iLike]: '%' + name + '%'
            },
            is_delete: 0,
            user_status: 0
        },
        attributes: [
            'user_id', 'name', 'username', 'email_id', 'user_image'
        ]
    };
    return userMaster.findAll(query).then(sequelize.getValues)
};

const getUsers = (pageNo, dataLimit, name) => {
    var offset = (pageNo - 1) * dataLimit;
    var query = {
        where: {
            is_delete: 0
        },
        attributes: ['user_id', 'name', 'username', 'email_id', 'user_image', 'login_type', 'createdAt', 'user_status','is_friend_request_allow','is_game_invitation_allow','is_leaderboards_allow','is_sound_effect_allow','is_background_music_allow'],
        offset: offset,
        limit: dataLimit,
        order: [['user_id', 'ASC']]
    };
    if (name) {
        query.where.name = {
            [Sequelize.Op.iLike]: '%' + name + '%'
        }
    }
    return userMaster.findAndCountAll(query).then(sequelize.getValues)
};

const updateNotificationSetting = (data, userId) => {
    const query = {
        returning: true,
        where: {
            user_id: userId
        }
    };
    return userMaster.update(data, query)
        .then(
            ([affectedCount, [updatedUser]]) => {
                if (affectedCount > 0) {
                    return { status: true, message: "Notification update successfully!", data: updatedUser }
                }
                return { status: false, message: "Something went wrong! Please try again!" }
            }
        ).catch(err => {
            console.log('====', err)
        })
}

const deleteUserAccount = (userId) => {
    const query = {
        returning: true,
        where: {
            user_id: userId,
        }
    };
    const data = {
        is_delete: 1
    }
    return userMaster.update(data, query)
        .then(
            ([affectedCount, [updatedUser]]) => {
                if (affectedCount > 0) {
                    return { status: true, message: "user deleted successfully!", data: updatedUser }
                }
                return { status: false, message: "Something went wrong! Please try again!" }
            }
        ).catch(err => {
            console.log('====', err)
        })
}


module.exports = {
    registerUser,
    authenticate,
    checkEmailExist,
    checkUsernameExist,
    getUserDetails,
    checkEmailExistForUpdate,
    checkUsernameExistForUpdate,
    updateUserProfile,
    authenticateFacebook,
    checkAccountIdExist,
    getUserByEmail,
    getSuggestionFriend,
    getAllUsers,
    getUserName,
    getMultipleUserDetails,
    getUsers,
    updateNotificationSetting,
    deleteUserAccount
}