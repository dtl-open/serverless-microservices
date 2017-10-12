/**
 * Created by dilunika on 10/10/17.
 */
const test = require('ava');
const uuid = require('uuid');
const axios = require('axios');

const invoicesResource = 'https://fjfx62s8jl.execute-api.ap-south-1.amazonaws.com/dev/invoices';

test('Invoice CRUD Cycle', async t => {

    const formData = {
        vin: 'GA-3333',
        customerId: uuid()
    };

    const createdInvoice = await createInvoice(formData);
    t.not(createdInvoice.id, undefined, 'Created Invoice should have an ID');
    t.is(createdInvoice.vin, formData.vin);

    const invoiceById = await findInvoiceById(createdInvoice.id);
    t.not(invoiceById, undefined);
    t.is(invoiceById.id, createdInvoice.id);

    const results = await findInvoiceByVIN(createdInvoice.vin);
    t.not(results.length, 0);
    t.is(results[0].vin, createdInvoice.vin);

    const updateDetails = {totalValue: 2500.00};
    const updatedInvoice = await updateInvoice(createdInvoice.id, updateDetails);
    t.is(updatedInvoice.id, createdInvoice.id);
    t.is(updatedInvoice.totalValue, updateDetails.totalValue);

    const deleted = await deleteInvoice(createdInvoice.id);
    t.not(deleted, undefined);
    console.log(deleted);

});

async function createInvoice(data) {

    const res = await axios.post(invoicesResource, data);

    return res.data;
}


async function findInvoiceById(id) {

    const res = await axios.get(invoicesResource + '/' + id);

    return res.data;
}

async function findInvoiceByVIN(vin) {

    const res = await axios.get(invoicesResource + '/search?vin=' + vin);

    return res.data;
}

async function updateInvoice(id, data) {

    const res = await axios.put(invoicesResource + '/' + id, data);

    return res.data;
}

async function deleteInvoice(id) {

    const res = await axios.delete(invoicesResource + '/' + id);

    return res.data;
}