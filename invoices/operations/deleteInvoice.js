'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event) => {

    const invoiceId = event.pathParameters.id;

    return remove(invoiceId);

};

function remove(invoiceId) {

    const params = {
        TableName: 'invoices',
        Key: {
            id: invoiceId
        }
    };

    return new Promise((resolve, reject) => {

        dynamoDb.delete(params, (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(params.Key);
        });
    });
}
