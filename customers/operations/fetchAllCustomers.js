'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event) => {

  const params = {
    TableName: 'invoices',
  };

  return new Promise((resolve, reject) => {

      dynamoDb.scan(params, (error, data) => {
          if (error) {
              reject(error);
          }
          resolve(data.Items);
      });
  });

};
