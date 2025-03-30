const appUserService = require('../services/app_user');
const avatarService = require('../services/avatar');
const config = require('../_config');
var multer = require('multer');
const mkdirp = require('mkdirp');
var crypto = require('crypto');
const moment = require('moment');
var uuid = require('uuid');
const mailjest = require('./mailjest');
const appleSigninAuth = require('apple-signin-auth');
var fs = require('fs');
var filePath = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var path = config.uploadDir + config.appUserImagePath;
        mkdirp(path, err => callback(null, path))
    },
    filename: function (req, file, callback) {
        callback(null, 'app_user_image_' + Date.now() + filePath.extname(file.originalname));
    }
});

var upload = multer({ storage: storage }).single('app_user_image');

function avatarImage(avatarId) {
    return avatarService.getAvatarById(avatarId).then(avatar => {
        if (avatar) {
            return avatar.dataValues.avatar_image;
        }
    })
}

function removeOldImage(oldFileName) {
    let fileNameWithPathUploadPath = config.uploadDir + config.appUserImagePath + oldFileName;
    if (fs.existsSync(fileNameWithPathUploadPath)) {
        fs.unlink(fileNameWithPathUploadPath, (err) => {
            console.log(err);
            return true;
        });
    } else {
        return false;
    }
}

function registerUser(req, res) {
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;
    upload(req, res, async function (err) {
        if (req.body.login_type === 'apple') {
            appleIdTokenClaims = await appleSigninAuth.verifyIdToken(req.body.id_token, {
                /** sha256 hex hash of raw nonce */
                ignoreExpiration: true,
                nonce: req.body.nonce ? crypto.createHash('sha256').update(req.body.nonce).digest('hex') : undefined,
            });

            return appUserService.checkAccountIdExist(appleIdTokenClaims.sub || '')
                .then(exists => {
                    if (exists) {
                        return appUserService.authenticateFacebook(req.body)
                            .then(async result => {
                                if (result) {
                                    res.send({
                                        status: true,
                                        token: result.token,
                                        data: result.data,
                                    });
                                } else {
                                    return res.status(200).send({
                                        status: false,
                                        message: "failed"
                                    });
                                }
                            })
                            .catch(err => {
                                return res.status(200).send({
                                    status: false,
                                    message: 'Failed!'
                                });
                            })
                    } else {
                        var appUserDetails = {};
                        appUserDetails.user_image = req.file !== undefined ? req.file.filename : 'default.png';
                        appUserDetails.account_id = (req.body.account_id) ? req.body.account_id : "";
                        appUserDetails.name = (req.body.name) ? req.body.name : "";
                        appUserDetails.username = (req.body.username) ? req.body.username.toLowerCase() : "";
                        appUserDetails.email_id = (appleIdTokenClaims) ? appleIdTokenClaims.email.toLowerCase() : "";
                        appUserDetails.login_type = (req.body.login_type) ? req.body.login_type : "";
                        appUserDetails._grade_id = (req.body._grade_id) ? (req.body._grade_id) * 1 : null;
                        appUserDetails.password = (req.body.password) ? passwordHmac : "";

                        return appUserService.registerUser(appUserDetails)
                            .then((data) => {
                                if (data) {
                                    return appUserService.authenticateFacebook(req.body)
                                        .then(result => {
                                            res.send({
                                                status: true,
                                                message: 'Added!',
                                                token: result.token,
                                                data: result.data,
                                            });
                                        })
                                        .catch(err => {
                                            return res.status(200).send({
                                                status: false,
                                                message: 'Failed!'
                                            });
                                        })
                                }
                            });
                    }
                });
        } else if (req.body.login_type === 'facebook') {
            return appUserService.checkAccountIdExist(req.body.account_id || '')
                .then(exists => {
                    if (exists) {
                        return appUserService.authenticateFacebook(req.body)
                            .then(async result => {
                                if (result) {
                                    res.send({
                                        status: true,
                                        token: result.token,
                                        data: result.data,
                                    });
                                } else {
                                    return res.status(200).send({
                                        status: false,
                                        message: "We’ve sent a verification link to your email address."
                                    });
                                }
                            })
                            .catch(err => {
                                return res.status(200).send({
                                    status: false,
                                    message: 'Failed!'
                                });
                            })
                    }
                    else {
                        var appUserDetails = {};
                        appUserDetails.user_image = req.file !== undefined ? req.file.filename : 'default.png';
                        appUserDetails.account_id = (req.body.account_id) ? req.body.account_id : "";
                        appUserDetails.name = (req.body.name) ? req.body.name : "";
                        appUserDetails.nickname = (req.body.nickname) ? req.body.nickname : "";
                        appUserDetails.username = (req.body.username) ? req.body.username.toLowerCase() : "";
                        appUserDetails.email_id = (req.body.email_id) ? req.body.email_id.toLowerCase() : "";
                        appUserDetails.login_type = (req.body.login_type) ? req.body.login_type : "";
                        appUserDetails.password = (req.body.password) ? passwordHmac : "";
                        appUserDetails.settings = (req.body.settings) ? req.body.settings : null;

                        return appUserService.registerUser(appUserDetails)
                            .then((data) => {
                                if (data) {
                                    return appUserService.authenticateFacebook(req.body)
                                        .then(result => {
                                            res.send({
                                                status: true,
                                                message: 'Added!',
                                                token: result.token,
                                                data: result.data,
                                            });
                                        })
                                        .catch(err => {
                                            return res.status(200).send({
                                                status: false,
                                                message: 'Failed!'
                                            });
                                        })
                                }
                            });
                    }
                });
        } else {
            req.body.email_id = req.body.email_id.toLowerCase()
            return appUserService.checkEmailExist(req.body.email_id || '')
                .then(async exists => {
                    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
                    var valid = emailRegex.test(req.body.email_id);
                    if (!valid) {
                        return res.status(200).send({
                            status: false,
                            message: 'Please enter valid Email-id!'
                        });
                    }
                    if (exists) {
                        return res.status(200).send({
                            status: false,
                            message: 'Email Id already exist!'
                        });
                    }

                    // return appUserService.checkUsernameExist(req.body.username || '')
                    //     .then(async exists => {

                    //         if (exists) {
                    //             return res.status(200).send({
                    //                 status: false,
                    //                 message: 'Username already exsist!'
                    //             });
                    //         }

                    var appUserDetails = {};
                    const passwordHmac = crypto.createHmac('sha256', config.jwtSecret).update(req.body.password).digest('hex');
                    appUserDetails.name = (req.body.name) ? req.body.name : "";
                    appUserDetails.nickname = (req.body.nickname) ? req.body.nickname : "";
                    appUserDetails.user_image = req.body._avatar_id ? await avatarImage(req.body._avatar_id) : 'default.png';
                    appUserDetails.username = (req.body.username) ? req.body.username.toLowerCase() : "";
                    appUserDetails.email_id = (req.body.email_id) ? req.body.email_id.toLowerCase() : "";
                    appUserDetails.login_type = (req.body.login_type) ? req.body.login_type : "normal";
                    appUserDetails.settings = (req.body.settings) ? req.body.settings : null;
                    appUserDetails.password = (req.body.password) ? passwordHmac : "";

                    return appUserService.registerUser(appUserDetails)
                        .then((data) => {
                            if (data) {
                                return appUserService.authenticate(req.body)
                                    .then(result => {
                                        let serverURL = config.getServerUrl(req)
                                        let imagePath;
                                        if (result.data['user_image'] === 'default.png') {
                                            imagePath = serverURL + config.avatarImagePath + result.data['user_image'];
                                        } else {
                                            imagePath = serverURL + config.appUserImagePath + result.data['user_image'];
                                        }
                                        result.data['user_image'] = imagePath;
                                        res.send({
                                            status: true,
                                            data: result
                                        });
                                    })
                                    .catch(err => {
                                        if (err.type === 'custom') {
                                            return res.status(200).send({
                                                status: false,
                                                message: err.message
                                            });
                                        }
                                        return res.status(200).send({
                                            status: false,
                                            message: 'Invalid Email Id or Password!'
                                        });
                                    })
                            }
                        });
                    // });
                });
        }
    })
};



function loginUser(req, res) {
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    req.body.email_id = req.body.email_id.toLowerCase();
    return appUserService.authenticate(req.body)
        .then(async result => {
            let serverURL = config.getServerUrl(req)
            let imagePath;
            if (result.data['user_image'] === 'default.png') {
                imagePath = serverURL + config.avatarImagePath + result.data['user_image'];
            } else {
                imagePath = serverURL + config.appUserImagePath + result.data['user_image'];
            }
            result.data['user_image'] = imagePath;
            res.send({
                status: true,
                token: result.token,
                data: result.data,
            });
        })
        .catch(err => {
            if (err.type === 'custom') {
                return res.status(200).send({
                    status: false,
                    message: err.message
                });
            }
            return res.status(100).send({
                status: false,
                message: 'Invalid Email Id or Password!'
            });
        })
};

function updateUserProfile(req, res) {
    upload(req, res, function (err) {
        var user_id = req.user.id;
        var body = req.body;
        req.body.email_id = req.body.email_id.toLowerCase()
        if (body && user_id) {
            return appUserService.getUserDetails(user_id)
                .then(userRes => {
                    return appUserService.checkEmailExistForUpdate(req.body.email_id || '', user_id)
                        .then(exists => {
                            if (userRes.login_type === 'facebook' && req.body.email_id === "") {
                                console.log("User Is FB User");
                            }
                            else {
                                var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
                                var valid = emailRegex.test(req.body.email_id);
                                if (!valid) {
                                    return res.status(200).send({
                                        status: false,
                                        message: 'Please enter valid Email-id!'
                                    });
                                }

                                if (exists) {
                                    return res.status(200).send({
                                        status: false,
                                        message: 'Email Id already exist!'
                                    });
                                }
                            }
                            var profileDetails = {};
                            profileDetails.name = (req.body.name) ? req.body.name : "";
                            profileDetails.nickname = (req.body.nickname) ? req.body.nickname : "";
                            profileDetails.username = (req.body.username) ? req.body.username.toLowerCase() : "";
                            profileDetails.email_id = (req.body.email_id) ? req.body.email_id.toLowerCase() : "";
                            profileDetails.settings = (req.body.settings) ? req.body.settings : null;
                            if (req.body._avatar_id) {
                                return avatarService.getAvatarById(req.body._avatar_id).then(avatar => {
                                    if (avatar) {
                                        profileDetails.user_image = avatar.dataValues.avatar_image;
                                        return appUserService.updateUserProfile(profileDetails, user_id).then(result => {
                                            let serverURL = config.getServerUrl(req)
                                            let imagePath;
                                            if (result.data.dataValues.user_image === 'default.png') {
                                                imagePath = serverURL + config.avatarImagePath + result.data.dataValues.user_image;
                                            } else {
                                                imagePath = serverURL + config.appUserImagePath + result.data.dataValues.user_image;
                                            }
                                            result.data.dataValues.settings = result.data.dataValues.settings ? JSON.parse(result.data.dataValues.settings) : null;
                                            var response = { status: true, message: result.message, data: result.data }
                                            res.send(response)
                                        });
                                    } else {
                                        let serverURL = config.getServerUrl(req)
                                        let imagePath;
                                        if (result.data.dataValues.user_image === 'default.png') {
                                            imagePath = serverURL + config.avatarImagePath + result.data.dataValues.user_image;
                                        } else {
                                            imagePath = serverURL + config.appUserImagePath + result.data.dataValues.user_image;
                                        }
                                        var response = { status: false, message: config.no_data_message }
                                        res.send(response);
                                    }
                                })
                            } else {
                                return appUserService.updateUserProfile(profileDetails, user_id).then(result => {
                                    let serverURL = config.getServerUrl(req)
                                    let imagePath;
                                    if (result.data.dataValues.user_image === 'default.png') {
                                        imagePath = serverURL + config.avatarImagePath + result.data.dataValues.user_image;
                                    } else {
                                        imagePath = serverURL + config.appUserImagePath + result.data.dataValues.user_image;
                                    }
                                    result.data.dataValues.user_image = imagePath;
                                    result.data.dataValues.settings = result.data.dataValues.settings ? JSON.parse(result.data.dataValues.settings) : null;
                                    var response = { status: true, message: result.message, data: result.data }
                                    res.send(response)
                                });
                            }
                        });
                });
        } else {
            var response = { status: false, message: "Invalid data!" }
            res.send(response);
        }
    })
};

function getUserProfile(req, res) {
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;
    var user_id = req.user.id;
    const { uId } = req.params;
    if (uId && uId != null) {
        user_id = uId;
    }
    if (user_id) {
        return appUserService.getUserDetails(user_id)
            .then(async (userRes) => {
                if (userRes) {
                    let serverURL = config.getServerUrl(req)
                    let imagePath;
                    if (userRes['user_image'] === 'default.png') {
                        imagePath = serverURL + config.avatarImagePath + userRes['user_image'];
                    } else {
                        imagePath = serverURL + config.appUserImagePath + userRes['user_image'];
                    }
                    userRes['user_image'] = imagePath;
                    userRes['settings'] = JSON.parse(userRes['settings']);
                    var response = { status: true, data: userRes }
                    res.send(response);
                } else {
                    var response = { status: false, message: "This user is not available on our system." }
                    res.send(response);
                }
            })
    } else {
        var response = { status: false, message: config.no_data_message }
        res.send(response);
    }
}

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

function requestResetPassword(req, res) {
    var body = req.body;
    body.email_id = body.email_id.toLowerCase()
    return appUserService.getUserByEmail(body.email_id)
        .then(userRes => {
            if (userRes) {
                var appUserDetails = {};
                appUserDetails.otp_number = generateOTP();
                return appUserService.updateUserProfile(appUserDetails, userRes.dataValues.user_id).then(async result => {
                    if (result) {

                        var userDetails = [{
                            "Email": result.data.email_id,
                            "Name": result.data.name
                        }]
                        var variables = {
                            "name": result.data.name,
                            "email": result.data.email_id,
                            "verification_code": appUserDetails.otp_number
                        }
                        // var text = await appTextService.getTextByKey('reset_password_template');

                        var templateId = 1591787;
                        var subject = 'One time password!';
                        mailjest.sendMail(templateId, subject, userDetails, variables)
                        var response = { status: true, message: 'Check your e-mail for OTP!' }
                    } else {
                        var response = { status: false, message: config.no_data_message }
                    }
                    res.send(response)
                });
            } else {
                var response = { status: false, message: "This user is not available on our system." }
                res.status(101).send(response);
            }
        })
};

function otpVerification(req, res) {
    var body = req.body;
    body.email_id = body.email_id.toLowerCase();
    body.otp_number = parseInt(body.otp_number);
    return appUserService.getUserByEmail(body.email_id)
        .then(userRes => {
            if (userRes) {
                if (userRes.dataValues.otp_number === body.otp_number) {
                    var response = { status: true, message: 'You can do further Process!' }
                } else {
                    var response = { status: false, message: 'Invalid OTP Please try again!' }
                }
                res.send(response)
            } else {
                var response = { status: false, message: "This user is not available on our system." }
                res.status(101).send(response);
            }
        })
};

function resetPassword(req, res) {
    var body = req.body;
    body.email_id = body.email_id.toLowerCase()
    body.otp_number = parseInt(body.otp_number);
    // if (body.password_one === body.password_two) {
    return appUserService.getUserByEmail(body.email_id)
        .then(userRes => {
            if (userRes) {
                if (userRes.dataValues.otp_number === body.otp_number) {
                    var appUserDetails = {};
                    const passwordHmac = crypto.createHmac('sha256', config.jwtSecret).update(req.body.new_password).digest('hex');
                    appUserDetails.password = (req.body.new_password) ? passwordHmac : "";
                    appUserDetails.otp_number = null;
                    return appUserService.updateUserProfile(appUserDetails, userRes.dataValues.user_id).then(result => {
                        if (result) {
                            var response = { status: true, message: 'Password changed successfully!' }
                        } else {
                            var response = { status: false, message: config.no_data_message }
                        }
                        res.send(response)
                    });
                } else {
                    var response = { status: false, message: 'Invalid OTP Please try again!' }
                    res.send(response)
                }
            } else {
                var response = { status: false, message: "This user is not available on our system." }
                res.status(101).send(response);
            }
        })

    // } else {
    //     var response = { status: false, message: "Both passwords are different!!" }
    //     res.send(response);
    // }
};

function getUsers(req, res) {
    var name = req.body.name ? req.body.name : ''
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    return appUserService.getUsers(pageNo, dataLimit, name).then(async (result) => {
        if (result) {
            const userDataFunction = async (resDataItem) => {
                let serverURL = config.getServerUrl(req)
                let imagePath;
                if (resDataItem['user_image'] === 'default.png') {
                    imagePath = serverURL + config.avatarImagePath + resDataItem['user_image'];
                } else {
                    imagePath = serverURL + config.appUserImagePath + resDataItem['user_image'];
                }
                resDataItem['user_image'] = imagePath;
                return resDataItem
            }
            return Promise.all(result.rows.map(resData => userDataFunction(resData)))
                .then(data => {
                    var response = { status: true, count: result.count, data: data }
                    res.send(response);
                })
        } else {
            var response = { status: false, message: config.no_data_message };
        }
        res.send(response);
    });
};
function changeUserStatus(req, res) {
    var body = req.body;
    return appUserService.updateUserProfile(body, body.user_id).then(result => {
        if (result) {
            var response = { status: true, message: 'User status change successfully!' };
        } else {
            var response = { status: false, message: config.no_data_message };
        }
        res.send(response);
    })
}

function getUserStatus(req, res) {
    var user_id = req.user.id;
    return appUserService.getUserDetails(user_id).then(result => {
        if (result) {
            if (result.dataValues.user_status) {
                var response = { status: false, message: 'User account is blocked!' };
                res.send(response);
            } else {
                var response = { status: true, message: 'User account is active!' };
                res.send(response);
            }
        } else {
            var response = { status: false, message: config.no_data_message };
            res.send(response);
        }
    })
}

function updateUserImage(req, res) {
    upload(req, res, async function (err) {
        var user_id = req.user.id;
        var body = req.body;
        var file = req.file;
        if (!file) {
            var response = { status: false, message: 'Please upload a file' };
            res.status(400).send(response);
        }
        var appUserDetails = {};
        appUserDetails.user_image = req.file !== undefined ? file.filename : 'default.png';
        return appUserService.getUserDetails(user_id)
            .then(userRes => {
                removeOldImage(userRes.dataValues.user_image);
                return appUserService.updateUserProfile(appUserDetails, user_id).then(result => {
                    let serverURL = config.getServerUrl(req);
                    let imagePath;
                    if (result.data.dataValues.user_image === 'default.png') {
                        imagePath = serverURL + config.avatarImagePath + result.data.dataValues.user_image;
                    } else {
                        imagePath = serverURL + config.appUserImagePath + result.data.dataValues.user_image;
                    }
                    result.data.dataValues.user_image = imagePath;
                    result.data.dataValues.settings = result.data.dataValues.settings ? JSON.parse(result.data.dataValues.settings) : null;
                    var response = { status: true, message: result.message, data: result.data }
                    res.send(response)
                });
            })
    })
}

function updateNotificationSetting(req, res) {
    var body = req.body
    var userId = req.user.id;
    var data = {}
    if (body.key === 'friend_request_allow') {
        data.is_friend_request_allow = body.value
    } else if (body.key === 'game_invitation_allow') {
        data.is_game_invitation_allow = body.value
    } else if (body.key === 'leaderboards_allow') {
        data.is_leaderboards_allow = body.value
    } else if (body.key === 'sound_effect_allow') {
        data.is_sound_effect_allow = body.value
    } else if (body.key === 'background_music_allow') {
        data.is_background_music_allow = body.value
    } else {
        var response = { status: false, message: config.no_data_message }
        return res.send(response);
    }

    return appUserService.updateNotificationSetting(data, userId).then(result => {
        if (result) {
            var response = { status: true, message: 'Notification update successfully!', data: result.data }
        } else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    });
}

function deleteUserAccount(req, res) {
    var userId = req.user.id;
    return appUserService.deleteUserAccount(userId).then(result => {
        if (result) {
            var response = { status: true, message: 'User delete successfully!' };
        } else {
            var response = { status: false, message: config.no_data_message };
        }
        res.send(response);
    })
}
module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    getUserProfile,
    resetPassword,
    otpVerification,
    requestResetPassword,
    getUsers,
    changeUserStatus,
    getUserStatus,
    updateUserImage,
    updateNotificationSetting,
    deleteUserAccount
}