'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const c = require('../utils/constants');

module.exports = (event) => {

    console.info('Search Audit Event Query Parameters ', event.queryStringParameters);

    const params = {
        TableName: c.tableName,
        IndexName: "performedUser",
        KeyConditionExpression: 'performedUser = :performedUser',
        ExpressionAttributeValues: {
            ':performedUser': event['queryStringParameters']['performedUser']
        }
    };

    return new Promise((resolve, reject) => {

        dynamoDb.query(params, (error, data) => {

            console.info('Search audit event. %s', JSON.stringify({params, error, data}));

            if (error) {
                reject(error);
            }
            const results = data ? data.Items : [];
            resolve(results);
        });
    });
};
