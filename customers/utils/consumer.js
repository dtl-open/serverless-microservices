/**
 * Created by dilunika on 12/10/17.
 */
const axios = require('axios');

const customerResource = 'https://a0f6e9qsu0.execute-api.ap-southeast-2.amazonaws.com/dev/customers';

module.exports = {

    createCustomer,
    findCustomerById,
    findCustomerByNIC,
    updateCustomer,
    deleteCustomer
};

function createCustomer(data) {

    return axios.post(customerResource, data)
        .then(res => res.data);

}


function findCustomerById(id) {

    return axios.get(customerResource + '/' + id)
        .then(res => res.data);
}

function findCustomerByNIC(nic) {

    return axios.get(customerResource + '/search?nic=' + nic)
        .then(res => res.data);
}

function updateCustomer(id, data) {

    return axios.put(customerResource + '/' + id, data)
        .then(res => res.data);;

}

function deleteCustomer(id) {

    return axios.delete(customerResource + '/' + id)
        .then(res => res.data);
}