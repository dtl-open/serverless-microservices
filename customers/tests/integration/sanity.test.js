/**
 * Created by dilunika on 10/10/17.
 */
const test = require('ava');
const uuid = require('uuid');
const axios = require('axios');
const consumer = require('../../utils/consumer');

test('Customer CRUD Cycle', async t => {

    const formData = {
        nic: '8485458875V',
        firstName: 'Kasun',
        surname: 'Jayasuriyage'
    };

    const createdCustomer = await consumer.createCustomer(formData);
    t.not(createdCustomer.id, undefined, 'Created Invoice should have an ID');
    t.is(createdCustomer.nic, formData.nic);

    const customerById = await consumer.findCustomerById(createdCustomer.id);
    t.not(customerById, undefined);
    t.is(customerById.id, createdCustomer.id);

    const results = await consumer.findCustomerByNIC(createdCustomer.vin);
    t.not(results.length, 0);
    t.is(results[0].nic, createdCustomer.nic);

    const updateDetails = {mobileNumber: '0112810899'};
    const updatedCustomer = await consumer.updateCustomer(createdCustomer.id, updateDetails);
    t.is(updatedCustomer.id, createdCustomer.id);
    t.is(updatedCustomer.mobileNumber, updateDetails.mobileNumber);

    const deleted = await consumer.deleteCustomer(createdCustomer.id);
    t.not(deleted, undefined);
    console.log(deleted);

});