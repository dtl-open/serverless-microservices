/**
 * Created by dilunika on 12/10/17.
 */
const axios = require('axios');

const invoicesResource = 'https://0u9jvk1kk4.execute-api.ap-southeast-2.amazonaws.com/dev/invoices';

module.exports = {

    createInvoice,
    findInvoiceById,
    findInvoiceByVIN,
    updateInvoice,
    deleteInvoice
};

function createInvoice(data) {

    return axios.post(invoicesResource, data)
        .then(res => res.data);

}


function findInvoiceById(id) {

    return axios.get(invoicesResource + '/' + id)
        .then(res => res.data);
}

function findInvoiceByVIN(vin) {

    return axios.get(invoicesResource + '/search?vin=' + vin)
        .then(res => res.data);
}

function updateInvoice(id, data) {

    return axios.put(invoicesResource + '/' + id, data)
        .then(res => res.data);;

}

function deleteInvoice(id) {

    return axios.delete(invoicesResource + '/' + id)
        .then(res => res.data);
}