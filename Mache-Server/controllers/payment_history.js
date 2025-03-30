const paymentService = require('../services/payment');
const packageService = require('../services/package');
const config = require('../config');

function addPayment(req, res) {
    var body = req.body
    var user_id = req.user.id
    var package_id = body.package_id
    return packageService.getPackageById(package_id).then((result) => {
        if(result){
            let setObject = {
                _user_id: user_id,
                _package_id: result.dataValues.package_id,
                package_name: result.dataValues.package_name,
                package_description: result.dataValues.package_description,
                total_amount: result.dataValues.total_amount,
                diamond_quantity: result.dataValues.diamond_quantity,
                is_vip: result.dataValues.is_vip,
                stars_quantity: result.dataValues.stars_quantity,
                currency_type: result.dataValues.currency_type
            }
            return paymentService.addPayment(setObject).then((result) => {
                if (result) {
                    var response = { status: true, message: 'Your Payment has been added', data: result.data }
                }
                else {
                    var response = { status: false, message: config.no_data_message }
                }
                res.send(response)
            })
        }
        else{
            var response = { status: false, message: config.no_data_message }
            res.send(response)
        }
       
    })
};

function getAllPayments(req, res) {

    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    return paymentService.getAllPayments(pageNo, dataLimit).then(result => {
        if (result.length > 0) {
            var response = { status: true, message: 'Success', data: result }
        } else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    });
}

function getUsersPayment(req, res) {
    var user_id = req.user.id;
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    return paymentService.getUsersPayment(pageNo, dataLimit, user_id).then(result => {
        if (result.length > 0) {
            var response = { status: true,message: 'Success', data: result }
        } else {
            var response = { status: false, message: config.no_data_message }
        }
        res.send(response)
    });
}

module.exports = {
    addPayment,
    getAllPayments,
    getUsersPayment
}