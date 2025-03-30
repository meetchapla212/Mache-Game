const appNotificationMaster = require('../models/app_notification_master').appNotificationMaster;
const sequelize = require('../db');

const addDeviceDetail = data => appNotificationMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! Device details added successfully!" }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});

const getDeviceById = (data) => {
    var query = {
        where: {
            _user_id: data._user_id,
            device_id: data.device_id,
            device_type: data.device_type,
        },
    };
    return appNotificationMaster.findOne(query).then(sequelize.getValues)
};

const updateDeviceById = (data, query) => {
    return appNotificationMaster.update(data, query).then(function ([rowsUpdate, [updatedDevice]]) {
        return updatedDevice;
    })
};

module.exports = {
    addDeviceDetail,
    getDeviceById,
    updateDeviceById,
};
