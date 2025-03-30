const packageMaster = require('../models/package_master').packageMaster;
var Sequelize = require('sequelize');
const sequelize = require('../db');
const moment = require('moment');

const getCount = () => {
    var query = {
        where: {
            is_delete: 0
        },
    };

    return packageMaster.count(query).then(sequelize.getValues)
}

const getPackageList = (pageNo, dataLimit, url) => {
    var offset = (pageNo - 1) * dataLimit;
    var whereStatement = {}
    whereStatement.is_active = true;
    whereStatement.is_delete = 0;
    if(url.includes('admin')){
        delete whereStatement.is_active;
    }

    var query = {
        where: whereStatement,
        attributes: ["package_id", "package_name", "package_description", "diamond_quantity", "stars_quantity", "total_amount", "currency_type", "is_vip", "is_active", "is_delete"],
        offset: offset,
        limit: dataLimit,
        order: [['package_id', 'ASC']]
    };

    return packageMaster.findAndCountAll(query).then(sequelize.getValues)
};

const addPackage = data => packageMaster.create({
    ...data
}).then((result) => {
    var response = { status: true, message: "Success! package added successfully!", data: result }
    return response;
}).catch((error) => {
    var response = { status: false, message: "Error! Invalid data found", error }
    return response;
});

const getPackageById = (id) => {
    var query = {
        where: {
            package_id: id
        },
        attributes: ["package_id", "package_name", "package_description", "diamond_quantity", "stars_quantity", "total_amount", "currency_type", "is_vip", "is_active", "is_delete"],
    };
    return packageMaster.findOne(query).then(sequelize.getValues)
};

const updatePackageById = (data, query) => {
    return packageMaster.update(data, query).then(function ([rowsUpdate, [updatedPackage]]) {
        if(rowsUpdate > 0){
            return { status: true, message: "Package update successfully!", data: updatedPackage }
        }
        else{
            return { status: false, message: "Something went wrong! Please try again!" }
        }
    })
    .catch(err => {
        console.log(err);
    })
};

const deletePackageById = (query) => {
   const data = {
       is_delete: 1
    };
    return packageMaster.update(data, query).then(function ([rowsUpdate, [updatedPackage]]) {
        if(rowsUpdate > 0){
            return { status: true, message: "Package delete successfully!", data: updatedPackage }
        }
        else{
            return { status: false, message: "Something went wrong! Please try again!" }
        }
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports = {
    getCount,
    getPackageList,
    addPackage,
    getPackageById,
    updatePackageById,
    deletePackageById
}