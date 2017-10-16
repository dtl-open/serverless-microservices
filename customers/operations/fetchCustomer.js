'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event) => {

    const invoiceId = event.pathParameters.id;

    return findInvoiceById(invoiceId);

};


function findInvoiceById(invoiceId) {

    const params = {
        TableName: 'invoices',
        Key: {
            id: invoiceId
        }
    };

    return new Promise((resolve, reject) => {

        dynamoDb.get(params, (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data.Item);
        });
    });
}