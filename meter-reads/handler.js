'use strict';

const createMeterRead = require('./operations/create.js');
const searchMeterReads = require('./operations/search.js');

module.exports.create = (event, context) => {

    createMeterRead(event)
        .then(result => {
            const response = createResponse(result, 201);
            context.succeed(response);
        });
};

module.exports.search = (event, context) => {

    searchMeterReads(event)
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