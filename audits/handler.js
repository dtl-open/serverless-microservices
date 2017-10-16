'use strict';

const createAuditEvent = require('./operations/create.js');
const fetchAuditEvent = require('./operations/fetchOne.js');
const searchAuditEvent = require('./operations/search.js');

module.exports.create = (event, context, callback) => {

    createAuditEvent(event)
        .then(result => {
                const response = createResponse(result, 201);
                context.succeed(response);
        });
};

module.exports.readOne = (event, context, callback) => {
    fetchAuditEvent(event)
        .then(result => {
            const response = createResponse(result);
            context.succeed(response);
        });
};

module.exports.search = (event, context, callback) => {

    searchAuditEvent(event)
        .then(result => {
            const response = createResponse(result);
            context.succeed(response);
        })
        .catch(err => {
            const response = createResponse(err, 500);
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