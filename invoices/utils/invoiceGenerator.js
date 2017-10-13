/**
 * Created by dilunika on 12/10/17.
 */

const randomString = require('random-string');
const uuid = require('uuid');
const logger = require('winston');
const R = require('ramda');
const cosumer = require('./consumer');

const servicesList = [

    'Check cambelt due date',
    'Check washers & wipers.',
    'Check coolant level',
    'Check coolant hoses',
    'Check battery',
    'Check horn7',
    'Check power steering fluid',
    'Check brake fluid',
    'Check clutch fluid',
    'Check transmission oil level',
    'Check differential oil level',
    'Check fuel filter',
    'Check air filter',
    'Check cabin filter',
    'Check all belts (excl cambelt)',
    'Check brake pads'
];

const generateInvoices = (numberOfInvoices) => {

    const invoices = R.range(0, parseInt(numberOfInvoices,10)).map(i => newInvoice());
    // console.log(JSON.stringify(invoices));
    const promises = invoices.map(i => cosumer.createInvoice(i));
    Promise.all(promises).then(values => logger.info('%d invoices are created !', values.length));
};

if(require.main === module) {
    generateInvoices(process.argv[2]);
} else {
    module.exports = generateInvoices;
}


function newInvoice() {

    const items = generateItems();
    const total = items.reduce((sum, v) => sum + v.amount, 0);

    return {

        vin: randomVin(),
        customerId: uuid(),
        items,
        totalAmount: +Number(total).toFixed(2)
    };
}

function randomVin() {

    const vin = randomString({
        length: 6,
        numeric: true,
        letters: true
    });

    return vin.toUpperCase();
}

function generateItems() {

    const n = Math.floor(Math.random() * 10) + 2;
    const items = R.range(0, n)
        .map(i => ({
            service: servicesList[Math.floor(Math.random() * servicesList.length)],
            amount: +Number((Math.random() * 1000) + 15).toFixed(2)
        }));

    return items;
}

