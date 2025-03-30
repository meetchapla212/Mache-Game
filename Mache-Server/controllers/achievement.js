var achievementService = require('../services/achievement');
const config = require('../config');
var multer = require('multer');
const mkdirp = require('mkdirp');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var path = config.uploadDir + config.achievementImagePath;
        mkdirp(path, err => callback(null, path))
    },
    filename: function (req, file, callback) {
        callback(null, 'achievement_image_' + Date.now());
    }
});

var upload = multer({ storage: storage }).single('achievement_image');

function addAchievement(req, res) {

    upload(req, res, function (err) {
        var achievementDetails = {};
        achievementDetails.achievement_image = req.file !== undefined ? req.file.filename : 'default';
        achievementDetails.achievement_name = (req.body.achievement_name) ? req.body.achievement_name : "";
        achievementDetails.potato_quantity = (req.body.potato_quantity) ? (req.body.potato_quantity) * 1 : 0;

        return achievementService.addAchievement(achievementDetails).then(data => res.send(data));
    });

};

function getAllAchievements(req, res) {
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    return achievementService.getAllAchievements(pageNo, dataLimit).then(result => {
        if (result) {
            let serverURL = config.getServerUrl(req)
            result.rows.forEach((achievement) => {
                achievement['achievement_image'] = serverURL + config.achievementImagePath + achievement['achievement_image'];
            })
            var response = { status: true, count: result.count, data: result.rows };
        } else {
            var response = { status: false, message: config.no_data_message };
        }
        res.send(response);
    });
};

function getAchievementById(req, res) {
    const { achievementId } = req.params;
    if (achievementId) {
        return achievementService.getAchievementById(achievementId).then(result => {
            let serverURL = config.getServerUrl(req)
            result['achievement_image'] = serverURL + config.achievementImagePath + result['achievement_image'];
            var response = { status: true, data: result };
            res.send(response);
        })
    } else {
        var response = { status: false, message: config.no_data_message };
        res.send(response);
    }
};

function updateAchievementById(req, res) {
    upload(req, res, function (err) {
        const body = req.body;
        var achievementId = body.id;
        return achievementService.getAchievementById(body.id).then(result => {
            if (result) {
                var achievementDetails = {};
                if (body.is_delete) {
                    achievementDetails.is_delete = 1;
                }
                else {
                    achievementDetails.achievement_image = req.file !== undefined ? req.file.filename : result.achievement_image;
                    achievementDetails.achievement_name = (req.body.achievement_name) ? req.body.achievement_name : "";
                    achievementDetails.potato_quantity = (req.body.potato_quantity) ? (req.body.potato_quantity) * 1 : 0;
                }
                return achievementService.updateAchievementById(achievementDetails, {
                    returning: true, where: { achievement_id: achievementId }
                }).then(result => {
                    if (result) {
                        var response = { status: true, data: result }
                    } else {
                        var response = { status: false, message: "Achievement not updated!" }
                    }
                    res.send(response)
                })
            } else {
                var response = { status: false, message: "No achievement found for update detail!" }
                res.send(response);
            }
        })
    })
};


module.exports = {
    addAchievement,
    getAllAchievements,
    getAchievementById,
    updateAchievementById
}