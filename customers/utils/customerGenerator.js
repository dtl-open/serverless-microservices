/**
 * Created by dilunika on 12/10/17.
 */

const randomString = require('random-string');
const logger = require('winston');
const R = require('ramda');
const consumer = require('./consumer');

const generateCustomers = (n) => {

    const invoices = R.range(0, parseInt(n,10)).map(i => newCustomer());
    // console.log(JSON.stringify(invoices));
    const promises = invoices.map(d => consumer.createCustomer(d));
    Promise.all(promises).then(values => logger.info('%d created are created !', values.length));
};

if(require.main === module) {
    generateCustomers(process.argv[2]);
} else {
    module.exports = generateCustomers;
}


function newCustomer() {

    return {

        nic: randomVin()
    };
}

function randomVin() {

    const vin = randomString({
        length: 8,
        numeric: true,
        letters: true
    });

    return vin.toUpperCase();
}
