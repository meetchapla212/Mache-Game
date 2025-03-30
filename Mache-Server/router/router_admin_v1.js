/*********************************************************************************************************** */
//                                  This is API Router for Admin APP                                       //
/********************************************************************************************************* */

const validations = require('../validation/index');
const authController = require('./../controllers/auth');
const coinController = require('./../controllers/coin');
const diamondController = require('./../controllers/diamond');
const levelController = require('./../controllers/level');
const achievementController = require('./../controllers/achievement');
const app_userController = require('../controllers/app_user')
const generalController = require('../controllers/general')
const roomController = require('./../controllers/room');
const apiEndpint = "/api/admin/v1";
const authMiddleware = require('./../middlewares/auth');
const packageController = require('../controllers/package');

var validate = require('express-validation');
validate.options({
	errors: [],
	status: 422,
	statusText: 'Invalid Parameter..!'
});

module.exports.set = (app) => {
	app.post(apiEndpint + '/login', validate(validations.login), authController.login);

	app.post(apiEndpint + '/rooms', roomController.addRoom);
	app.post(apiEndpint + '/users', authMiddleware.checkAdminAuth, app_userController.getUsers);
	app.put(apiEndpint + '/user-status', authMiddleware.checkAdminAuth, app_userController.changeUserStatus);
	app.get(apiEndpint + '/dashboard', authMiddleware.checkAdminAuth, generalController.getCount);
	app.post(apiEndpint + '/coins', authMiddleware.checkAdminAuth, coinController.addCoin);
	app.get(apiEndpint + '/coins/:coinId', authMiddleware.checkAdminAuth, coinController.getCoinById);
	app.get(apiEndpint + '/coins', authMiddleware.checkAdminAuth, coinController.getAllCoins);
	app.put(apiEndpint + '/coins', authMiddleware.checkAdminAuth, coinController.updateCoinById);

	app.post(apiEndpint + '/diamonds', authMiddleware.checkAdminAuth, diamondController.addDiamond);
	app.get(apiEndpint + '/diamonds/:diamondId', authMiddleware.checkAdminAuth, diamondController.getDiamondById);
	app.get(apiEndpint + '/diamonds', authMiddleware.checkAdminAuth, diamondController.getAllDiamonds);
	app.put(apiEndpint + '/diamonds', authMiddleware.checkAdminAuth, diamondController.updateDiamondById);

	app.post(apiEndpint + '/achievements', authMiddleware.checkAdminAuth, achievementController.addAchievement);
	app.get(apiEndpint + '/achievements/:achievementId', authMiddleware.checkAdminAuth, achievementController.getAchievementById);
	app.get(apiEndpint + '/achievements', authMiddleware.checkAdminAuth, achievementController.getAllAchievements);
	app.put(apiEndpint + '/achievements', authMiddleware.checkAdminAuth, achievementController.updateAchievementById);

	app.post(apiEndpint + '/levels', authMiddleware.checkAdminAuth, levelController.addLevel);
	app.get(apiEndpint + '/levels/:levelId', authMiddleware.checkAdminAuth, levelController.getLevelById);
	app.get(apiEndpint + '/levels', authMiddleware.checkAdminAuth, levelController.getAllLevels);
	app.put(apiEndpint + '/levels', authMiddleware.checkAdminAuth, levelController.updateLevelById);

	app.get(apiEndpint + '/get-package-list', authMiddleware.checkAdminAuth, packageController.getPackageList);
	app.get(apiEndpint + '/package/:packageId', authMiddleware.checkAdminAuth, packageController.getPackageById);
	app.post(apiEndpint + '/add-package', authMiddleware.checkAdminAuth, packageController.addPackage);
	app.put(apiEndpint + '/package', authMiddleware.checkAdminAuth, packageController.updatePackageById);
	app.delete(apiEndpint + '/package/:packageId', authMiddleware.checkAdminAuth, packageController.deletePackageById);
}
