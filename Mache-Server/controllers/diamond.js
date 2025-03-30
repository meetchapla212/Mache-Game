var diamondService = require('../services/diamond');
// var paymentService = require('../services/payment_history');
const config = require('../config');
// const stripe = require('stripe')(config.stripe_secret_key);


function addDiamond(req, res) {
    const diamondDetails = req.body;
    diamondDetails.is_recurring = (diamondDetails.is_recurring) * 1;
    diamondDetails.diamond_quantity = (diamondDetails.diamond_quantity) * 1;
    // if (diamondDetails.is_recurring === 1) {
    //     stripe.plans.create(
    //         {
    //             amount: (diamondDetails.total_amount * 100),
    //             currency: 'usd',
    //             interval: 'month',
    //             product: { name: diamondDetails.diamond_name },
    //         }).then((response) => {
    //             diamondDetails.plan_id = response.id
    //             return diamondService.addDiamond(diamondDetails).then(data => res.send(data));
    //         })
    // } else {
    return diamondService.addDiamond(diamondDetails).then(data => res.send(data));
    // }
};

function getAllDiamonds(req, res) {
    var pageNo = (req.query.page && req.query.page > 0) ? req.query.page : 1;
    var dataLimit = (req.query.limit) ? req.query.limit : config.dataLimit;

    return diamondService.getAllDiamonds(pageNo, dataLimit).then(result => {
        if (result) {
            const diamondFunction = async (diamond) => {
                // diamond.dataValues['totalPurchase'] = await paymentService.totalNumberOfPurchase(diamond['diamond_package_id']);
                // diamond.dataValues['uniquePurchase'] = await paymentService.totalUniqueNumberOfPurchase(diamond['diamond_package_id']);
                return diamond
            }

            return Promise.all(result.rows.map(resData => diamondFunction(resData)))
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

function getDiamondById(req, res) {
    const { diamondId } = req.params;
    if (diamondId) {
        return diamondService.getDiamondById(diamondId).then(result => {
            var response = { status: true, data: result };
            res.send(response);
        })
    } else {
        var response = { status: false, message: config.no_data_message };
        res.send(response);
    }
};

function updateDiamondById(req, res) {
    const diamondDetails = req.body;
    return diamondService.getDiamondById(diamondDetails.id).then(result => {
        if (result) {
            return diamondService.updateDiamondById(diamondDetails, {
                returning: true, where: { diamond_package_id: diamondDetails.id }
            }).then(result => {
                if (result) {
                    var response = { status: true, data: result }
                } else {
                    var response = { status: false, message: "Diamond not updated!" }
                }
                res.send(response)
            })
        } else {
            var response = { status: false, message: "No diamond found for update detail!" }
            res.send(response);
        }
    })
};


module.exports = {
    addDiamond,
    getAllDiamonds,
    getDiamondById,
    updateDiamondById
}