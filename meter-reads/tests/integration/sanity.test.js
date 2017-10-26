/**
 * Created by dilunika on 10/10/17.
 */
const test = require('ava');
const uuid = require('uuid');
const axios = require('axios');
const consumer = require('../../utils/consumer');

test('Meter Reads CRUD Cycle', async t => {

    const meterRead = {
        readingTime: new Date().getTime(),
        meterNumber: 'M00000000' + Math.floor(Math.random() * 100) + 1,
        provider: Math.floor(Math.random() * 10) + 1
    };

    const createdMeterRead = await consumer.sendMeterRead(meterRead);
    console.log('Created meter read ', JSON.stringify(createdMeterRead));
    t.not(createdMeterRead.id, undefined, 'Created audit event should have an ID');

    const results = await consumer.searchMeterReadsByDate(meterRead.readingTime);
    t.not(results.length, 0);

});