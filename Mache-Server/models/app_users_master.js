const Sequelize = require('sequelize');
const db = require('../db');
var friendRequestMaster = require('./friend_request_master').friendRequestMaster
var inviteMaster = require('./invite_master').inviteMaster
var resultMaster = require('./result_master').resultMaster


const userMaster = db.define('app_users_master', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: Sequelize.STRING(60),
    },
    name: {
        type: Sequelize.STRING(30),
    },
    username: {
        type: Sequelize.STRING(30),
    },
    email_id: {
        type: Sequelize.STRING(),
    },
    user_image: {
        type: Sequelize.STRING(100),
    },
    nickname: {
        type: Sequelize.STRING(30),
    },
    login_type: {
        type: Sequelize.STRING(),
    },
    password: {
        type: Sequelize.STRING(),
    },
    settings: {
        type: Sequelize.JSONB,
    },
    otp_number: {
        type: Sequelize.INTEGER
    },
    user_status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    is_delete: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    status: {
        type: Sequelize.STRING(15),
        defaultValue: 'active'
    },
    is_friend_request_allow: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    is_game_invitation_allow: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    is_leaderboards_allow: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    is_sound_effect_allow: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    is_background_music_allow: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
});

module.exports = {
    userMaster
}

userMaster.hasMany(friendRequestMaster, { foreignKey: '_user_id' })
friendRequestMaster.belongsTo(userMaster, { as: 'app_users_master', foreignKey: '_user_id' })

userMaster.hasMany(inviteMaster, { foreignKey: '_user_id' })
inviteMaster.belongsTo(userMaster, { as: 'app_users', foreignKey: '_user_id' })

userMaster.hasMany(inviteMaster, { foreignKey: '_friend_id' })
inviteMaster.belongsTo(userMaster, { as: 'friend_users', foreignKey: '_friend_id' })

userMaster.hasMany(friendRequestMaster, { foreignKey: '_friend_id' })
friendRequestMaster.belongsTo(userMaster, { as: 'app_users_masters', foreignKey: '_friend_id' })

userMaster.hasMany(resultMaster, { foreignKey: '_user_id' })
resultMaster.belongsTo(userMaster, { as: 'user_detail', foreignKey: '_user_id' })