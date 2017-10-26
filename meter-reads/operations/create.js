'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const c = require('../utils/constants');

module.exports = (event) => {

  console.info('Create Meter Read ', event.body);

  const data = JSON.parse(event.body);

  data.id = uuid.v1();
  data.time = new Date().getTime();

  return save(data);

};

function save(data) {

    const params = {
        TableName: c.tableName,
        Item: data
    };

    return new Promise((resolve, reject) => {

        dynamoDb.put(params, (error, data) => {

            console.info('Create audit event by id. %s', JSON.stringify({params, error, data}));

            if (error) {
                reject(error);
            }
            resolve(params.Item);
        });
    });
}
