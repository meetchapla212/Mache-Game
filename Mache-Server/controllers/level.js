var levelService = require('../services/level');
const config = require('../config');
var multer = require('multer');
const mkdirp = require('mkdirp');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var path = config.uploadDir + config.levelImagePath;
        mkdirp(path, err => callback(null, path))
    },
    filename: function (req, file, callback) {
        callback(null, 'level_image_' + Date.now());
    }
});

var upload = multer({ storage: storage }).single('level_image');

function addLevel(req, res) {

    upload(req, res, function (err) {
        var levelDetails = {};
        levelDetails.level_image = req.file !== undefined ? req.file.filename : 'default';
        levelDetails.level_name = (req.body.level_name) ? req.body.level_name : "";
        levelDetails.potato_quantity = (req.body.potato_quantity) ? (req.body.potato_quantity) * 1 : 0;

        return levelService.addLevel(levelDetails).then(data => res.send(data));
    });

};

function getAllLevels(req, res) {
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    return levelService.getAllLevels(pageNo, dataLimit).then(result => {
        if (result) {
            let serverURL = config.getServerUrl(req)
            result.rows.forEach((level) => {
                level['level_image'] = serverURL + config.levelImagePath + level['level_image'];
            })
            var response = { status: true, count: result.count, data: result.rows };
        } else {
            var response = { status: false, message: config.no_data_message };
        }
        res.send(response);
    });
};

function getLevelById(req, res) {
    const { levelId } = req.params;
    if (levelId) {
        return levelService.getLevelById(levelId).then(result => {
            let serverURL = config.getServerUrl(req)
            result['level_image'] = serverURL + config.levelImagePath + result['level_image'];
            var response = { status: true, data: result };
            res.send(response);
        })
    } else {
        var response = { status: false, message: config.no_data_message };
        res.send(response);
    }
};

function updateLevelById(req, res) {
    upload(req, res, function (err) {
        const body = req.body;
        var levelId = body.id;
        return levelService.getLevelById(body.id).then(result => {
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
                return levelService.updateLevelById(levelDetails, {
                    returning: true, where: { level_id: levelId }
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
    })
};


module.exports = {
    addLevel,
    getAllLevels,
    getLevelById,
    updateLevelById
}