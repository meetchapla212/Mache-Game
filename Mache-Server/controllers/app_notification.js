var appNotificationService = require('../services/app_notification');
const config = require('../config');



function addDeviceDetail(req, res) {
    const body = req.body;
    body._user_id = req.user.id;
    return appNotificationService.getDeviceById(body).then(result => {
        if (result) {
            var detail = {};
            detail.device_token = body.device_token
            return appNotificationService.updateDeviceById(detail, {
                returning: true, where: { app_id: result.dataValues.app_id }
            }).then(result => {
                if (result) {
                    var response = { status: true, data: result }
                } else {
                    var response = { status: false, message: "Device Detail not updated!" }
                }
                res.send(response)
            })
        } else {
            return appNotificationService.addDeviceDetail(body).then(data => res.send(data));
        }
    })

};

function updateDeviceById(req, res) {
    const body = req.body;
    body._user_id = req.user.id;
    var appId = body.id;
    return appNotificationService.getDeviceById(body).then(result => {
        if (result) {
            var levelDetails = {};
            if (body.is_delete) {
                levelDetails.is_delete = 1;
            }
            else {
                levelDetails.level_image = req.file !== undefined ? req.file.filename : result.level_image;
                levelDetails.level_name = (req.body.level_name) ? req.body.level_name : "";
                levelDetails.potato_quantity = (req.body.potato_quantity) ? (req.body.potato_quantity) * 1 : 0;
            }
            return appNotificationService.updateDeviceById(levelDetails, {
                returning: true, where: { level_id: appId }
            }).then(result => {
                if (result) {
                    var response = { status: true, data: result }
                } else {
                    var response = { status: false, message: "Level not updated!" }
                }
                res.send(response)
            })
        } else {
            var response = { status: false, message: "No level found for update detail!" }
            res.send(response);
        }
    })
};


module.exports = {
    addDeviceDetail,
    updateDeviceById
}