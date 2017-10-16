'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event) => {
    const data = JSON.parse(event.body);

    data.id = event.pathParameters.id;
    data.updatedAt = new Date().getTime();

    const params = {
        TableName: 'invoices',
        Item: data
    };

    return new Promise((resolve, reject) => {

        dynamoDb.put(params, (error, data) => {
            if (error) {
                reject(error);
            }

            console.log('Updated Invoice response ', JSON.stringify(data));

            resolve(params.Item);
        });
    });
};
