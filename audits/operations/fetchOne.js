'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const c = require('../utils/constants');

module.exports = (event) => {

    const auditEventId = event.pathParameters.id;

    return findInvoiceById(auditEventId);

};


function findInvoiceById(auditEventId) {

    const params = {
        TableName: c.tableName,
        Key: {
            id: auditEventId
        }
    };

    return new Promise((resolve, reject) => {

        dynamoDb.get(params, (error, data) => {

            console.info('Find audit event by id. %s', JSON.stringify({params, error, data}));

            if (error) {
                reject(error);
            }
            resolve(data.Item);
        });
    });
}