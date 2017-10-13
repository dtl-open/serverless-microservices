/**
 * Created by dilunika on 10/10/17.
 */
const test = require('ava');
const uuid = require('uuid');
const axios = require('axios');
const consumer = require('../../utils/consumer');

test('Invoice CRUD Cycle', async t => {

    const formData = {
        vin: 'GA-3333',
        customerId: uuid()
    };

    const createdInvoice = await consumer.createInvoice(formData);
    t.not(createdInvoice.id, undefined, 'Created Invoice should have an ID');
    t.is(createdInvoice.vin, formData.vin);

    const invoiceById = await consumer.findInvoiceById(createdInvoice.id);
    t.not(invoiceById, undefined);
    t.is(invoiceById.id, createdInvoice.id);

    const results = await consumer.findInvoiceByVIN(createdInvoice.vin);
    t.not(results.length, 0);
    t.is(results[0].vin, createdInvoice.vin);

    const updateDetails = {totalValue: 2500.00};
    const updatedInvoice = await consumer.updateInvoice(createdInvoice.id, updateDetails);
    t.is(updatedInvoice.id, createdInvoice.id);
    t.is(updatedInvoice.totalValue, updateDetails.totalValue);

    const deleted = await consumer.deleteInvoice(createdInvoice.id);
    t.not(deleted, undefined);
    console.log(deleted);

});