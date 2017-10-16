'use strict';

const createCustomer = require('./operations/createCustomer.js');
const fetchAllCustomers = require('./operations/fetchAllCustomers.js');
const fetchCustomer = require('./operations/fetchCustomer.js');
const updateCustomer = require('./operations/updateCustomer.js');
const deleteCustomer = require('./operations/deleteCustomer.js');
const searchCustomers = require('./operations/searchCustomers.js');

module.exports.create = (event, context, callback) => {

    createCustomer(event)
        .then(result => {
                const response = createResponse(result, 201);
                context.succeed(response);
        });
};

module.exports.readAll = (event, context, callback) => {

    fetchAllCustomers(event)
        .then(result => {
            const response = createResponse(result, 200);
            context.succeed(response);
        });
};

module.exports.readOne = (event, context, callback) => {
    fetchCustomer(event)
        .then(result => {
            const response = createResponse(result);
            context.succeed(response);
        });
};

module.exports.search = (event, context, callback) => {

    searchCustomers(event)
        .then(result => {
            const response = createResponse(result);
            context.succeed(response);
        })
        .catch(err => {
            const response = createResponse(err, 500);
            context.succeed(response);
        });

};

module.exports.update = (event, context, callback) => {

    updateCustomer(event)
        .then(result => {
            const response = createResponse(result, 200);
            context.succeed(response);
        });
};

module.exports.delete = (event, context, callback) => {

    deleteCustomer(event)
        .then(result => {
            const response = createResponse(result, 200);
            context.succeed(response);
        });
};


function createResponse(result, statusCode) {

    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(result),
    };
}