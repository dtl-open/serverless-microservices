'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event) => {

    console.info('Search Invoices ', event);

    const params = {
        TableName: 'invoices',
        IndexName: "vin",
        KeyConditionExpression: 'vin = :vin',
        ExpressionAttributeValues: {
            ':vin': event['queryStringParameters']['vin']
        }
    };

    return new Promise((resolve, reject) => {

        dynamoDb.query(params, (error, data) => {

            console.info('Search Invoices Dynamo Stuff ', params, data, error);

            if (error) {
                reject(error);
            }
            const results = data ? data.Items : [];
            resolve(results);
        });
    });
};
