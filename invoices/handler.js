'use strict';

const createInvoice = require('./operations/createInvoice.js');
const readAllInvoices = require('./operations/readAllInvoices.js');
const readInvoice = require('./operations/readInvoice.js');
const updateInvoice = require('./operations/updateInvoice.js');
const deleteInvoice = require('./operations/deleteInvoice.js');
const searchInvoices = require('./operations/searchInvoices.js');

module.exports.create = (event, context, callback) => {

    createInvoice(event)
        .then(result => {
                const response = createResponse(result, 201);
                context.succeed(response);
        });
};

module.exports.readAll = (event, context, callback) => {

    readAllInvoices(event)
        .then(result => {
            const response = createResponse(result, 200);
            context.succeed(response);
        });
};

module.exports.readOne = (event, context, callback) => {
    readInvoice(event)
        .then(result => {
            const response = createResponse(result);
            context.succeed(response);
        });
};

module.exports.searchInvoices = (event, context, callback) => {

    searchInvoices(event)
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

    updateInvoice(event)
        .then(result => {
            const response = createResponse(result, 200);
            context.succeed(response);
        });
};

module.exports.delete = (event, context, callback) => {

    deleteInvoice(event)
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