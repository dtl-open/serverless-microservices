/**
 * Created by dilunika on 12/10/17.
 */
const axios = require('axios');

const auditEventResource = 'https://7n6eg0wxc4.execute-api.ap-southeast-2.amazonaws.com/dev/audits';

module.exports = {

    createAuditEvent,
    findAuditEventById,
    searchAuditEventsByUser
};

function createAuditEvent(data) {

    return axios.post(auditEventResource, data)
        .then(res => res.data);

}


function findAuditEventById(id) {

    return axios.get(auditEventResource + '/' + id)
        .then(res => res.data);
}

function searchAuditEventsByUser(performedUser) {

    return axios.get(auditEventResource + '/search?performedUser=' + performedUser)
        .then(res => res.data);
}
