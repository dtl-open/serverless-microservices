'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (event) => {

  console.info('Create Invoice Event ', event);

  const data = JSON.parse(event.body);

  data.id = uuid.v1();
  data.updatedAt = new Date().getTime();

  return save(data);

};

function save(data) {

    const params = {
        TableName: 'invoices',
        Item: data
    };

    return new Promise((resolve, reject) => {

        dynamoDb.put(params, (error, data) => {

            console.info('Create Invoice Dynamo DB res ', data);

            if (error) {
                reject(error);
            }
            resolve(params.Item);
        });
    });
}
