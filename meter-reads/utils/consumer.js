/**
 * Created by dilunika on 12/10/17.
 */
const axios = require('axios');

const meterReadResource = 'https://fwpe69sge5.execute-api.ap-southeast-2.amazonaws.com/dev/meterReads';

module.exports = {

    sendMeterRead,
    searchMeterReadsByDate
};

function sendMeterRead(data) {

    return axios.post(meterReadResource, data)
        .then(res => res.data);

}


function searchMeterReadsByDate(readingTime) {

    return axios.get(meterReadResource + '/search?readingTime=' + readingTime)
        .then(res => res.data);
}
