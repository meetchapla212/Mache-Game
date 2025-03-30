const packageService = require('../services/package');
const config = require('../config');

function getPackageList(req, res) {

    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;
    var url = req.url;
    return packageService.getPackageList(pageNo, dataLimit, url).then(result => {
        if (result) {
            var response = { status: true, count: result.count, message: 'Success', data: result.rows }
        } else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    });
}

function addPackage(req, res) {
    var body = req.body
    return packageService.addPackage(body).then((result) => {
        if (result) {
            var response = { status: true, message: 'Your Package has been added', data: result.data }
        }
        else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    })
};

function getPackageById(req, res) {
    const { packageId } = req.params;
    if (packageId) {
        return packageService.getPackageById(packageId).then(result => {
            if(result){
                var response = { status: true, message: 'Success', data: result };
            }
            else {
                var response = { status: false, message: config.no_data_message }
            }
            res.send(response);
        })
    } else {
        var response = { status: false, message: config.no_data_message };
        res.send(response);
    }
};

function updatePackageById(req, res) {
    const packageDetails = req.body;
    return packageService.getPackageById(packageDetails.id).then(result => {
        if (result) {
            return packageService.updatePackageById(packageDetails, {
                returning: true, where: { package_id: packageDetails.id }
            }).then(result => {
                if (result) {
                    var response = { status: true, message: "Success", data: result.data }
                } else {
                    var response = { status: false, message: "Package not updated!" }
                }
                res.send(response)
            })
        } else {
            var response = { status: false, message: "No package found!" }
            res.send(response);
        }
    })
};

function deletePackageById(req, res) {
    const { packageId } = req.params;
    if (packageId) {
        return packageService.getPackageById(packageId).then(result => {
        if (result) {
            return packageService.deletePackageById({
                returning: true, where: { package_id: packageId }
            }).then(result => {
                if(result){
                    var response = { status: true, message: 'Success', data: result.data };
                }
                else {
                    var response = { status: false, message: config.no_data_message }
                }
                res.send(response);
            })
        }
        else {
            var response = { status: false, message: "No package found!" }
            res.send(response);
        }
})
    } else {
        var response = { status: false, message: config.no_data_message };
        res.send(response);
    }
};

module.exports = {
    getPackageList,
    addPackage,
    getPackageById,
    updatePackageById,
    deletePackageById
}