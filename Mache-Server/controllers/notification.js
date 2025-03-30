const config = require('../config');
var FCM = require('fcm-node');
var apn = require('apn');

var GOOGLE_KEY = config.google_server_key;



function androidPushNotification(token, data) {
    const fcm = new FCM(GOOGLE_KEY);
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'registration_token',
        collapse_key: 'your_collapse_key',

        notification: {
            title: 'Title of your push notification',
            body: 'Body of your push notification'
        }
    };
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}

module.exports = {
    androidPushNotification
}