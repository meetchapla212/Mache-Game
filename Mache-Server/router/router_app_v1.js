// /*********************************************************************************************************** */
// //                                  This is API Router for Mobile APP                                       //
// /********************************************************************************************************* */
const validations = require('../validation/index');
const apiEndpint = "/api/v1";

const app_userController = require('../controllers/app_user');
const avatarController = require('../controllers/avatar');
const roomController = require('../controllers/room');
const FriendRequestController = require('../controllers/friend_request');
const appNotificationController = require('../controllers/app_notification');
const inviteController = require('../controllers/invite');
const generalController = require('../controllers/general');
const authMiddleware = require('./../middlewares/auth');
const resultController = require('../controllers/result');
const paymentController = require('../controllers/payment_history');
const packageController = require('../controllers/package');

// var deeplink = require('node-deeplink');

var validate = require('express-validation');
const { paymentMaster } = require('../models/payment_history');
validate.options({
    errors: [],
    status: 422,
    statusText: 'Invalid Parameter..!'
});

module.exports.set = (app) => {
    /************************** With API_KEY ************************/
    app.get(apiEndpint + '/avatars', authMiddleware.checkMobileAuth, avatarController.getAvatars);

    app.post(apiEndpint + '/register', authMiddleware.checkMobileAuth, app_userController.registerUser);
    app.post(apiEndpint + '/login', validate(validations.login), app_userController.loginUser);

    app.post(apiEndpint + '/request-for-reset-password', authMiddleware.checkMobileAuth, app_userController.requestResetPassword);
    app.post(apiEndpint + '/otp-verification', authMiddleware.checkMobileAuth, app_userController.otpVerification);
    app.put(apiEndpint + '/reset-password', authMiddleware.checkMobileAuth, app_userController.resetPassword);
    /************************** With TOKEN ************************/
    app.put(apiEndpint + '/profile', authMiddleware.checkAuth, app_userController.updateUserProfile);
    app.get(apiEndpint + '/profile', authMiddleware.checkAuth, app_userController.getUserProfile);
    app.get(apiEndpint + '/user/profile/:uId', authMiddleware.checkAuth, app_userController.getUserProfile);
    app.get(apiEndpint + '/rooms', authMiddleware.checkAuth, roomController.getAllRooms);
    app.post(apiEndpint + '/rooms', authMiddleware.checkAuth, roomController.addRoom);
    app.get(apiEndpint + '/suggested-friends', authMiddleware.checkAuth, FriendRequestController.getSuggestionFriend);
    app.post(apiEndpint + '/send-request', authMiddleware.checkAuth, FriendRequestController.sendRequest);
    // app.get(apiEndpint + '/pending-request', authMiddleware.checkAuth, FriendRequestController.getPendingRequest);
    app.put(apiEndpint + '/accept-request', authMiddleware.checkAuth, FriendRequestController.acceptRequest);
    app.get(apiEndpint + '/users', authMiddleware.checkAuth, FriendRequestController.getAllUsers);
    app.get(apiEndpint + '/user-status', authMiddleware.checkAuth, app_userController.getUserStatus);
    app.post(apiEndpint + '/recent-friend', authMiddleware.checkAuth, FriendRequestController.getRecentFriend);
    app.post(apiEndpint + '/is-your-friend', authMiddleware.checkAuth, FriendRequestController.isYourFriend);

    app.post(apiEndpint + '/device-details', authMiddleware.checkAuth, appNotificationController.addDeviceDetail);
    app.post(apiEndpint + '/update-invite', authMiddleware.checkAuth, inviteController.updateInvitation);
    app.get(apiEndpint + '/user-invitation', authMiddleware.checkAuth, inviteController.getUserAcceptedInvitation);

    app.get(apiEndpint + '/notifications', authMiddleware.checkAuth, generalController.getNotifications);
    app.get(apiEndpint + '/user-rooms', authMiddleware.checkAuth, roomController.getUsersRooms);
    app.put(apiEndpint + '/user-image-update', authMiddleware.checkAuth, app_userController.updateUserImage);
    app.put(apiEndpint + '/start-round', authMiddleware.checkAuth, roomController.startRound);
    app.post(apiEndpint + '/add-result', authMiddleware.checkAuth, resultController.addResult);
    app.post(apiEndpint + '/update-result', authMiddleware.checkAuth, resultController.updateResult);
    app.post(apiEndpint + '/get-current-round-result', authMiddleware.checkAuth, resultController.getCurrentRoundResultByRoomId);
    app.post(apiEndpint + '/get-overall-result', authMiddleware.checkAuth, resultController.getOverAllResultByRoomId);
    app.post(apiEndpint + '/main-leaderboard', authMiddleware.checkAuth, resultController.getMainLeaderBoard);
    app.put(apiEndpint + '/notification_settings', authMiddleware.checkAuth, app_userController.updateNotificationSetting);
    app.put(apiEndpint + '/user-account-delete', authMiddleware.checkAuth, app_userController.deleteUserAccount);
    app.post(apiEndpint + '/add-payment', authMiddleware.checkAuth, paymentController.addPayment);
    app.get(apiEndpint + '/payments', authMiddleware.checkAuth, paymentController.getAllPayments);
    app.get(apiEndpint + '/user-payments', authMiddleware.checkAuth, paymentController.getUsersPayment);
    app.get(apiEndpint + '/get-package-list', authMiddleware.checkAuth, packageController.getPackageList);
    app.get(apiEndpint + '/package/:packageId', authMiddleware.checkAuth, packageController.getPackageById);

    app.get(apiEndpint + '/cron-room-delete', roomController.roomDeleteCron);
}
