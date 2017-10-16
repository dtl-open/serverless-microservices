/**
 * Created by dilunika on 10/10/17.
 */
const test = require('ava');
const uuid = require('uuid');
const axios = require('axios');
const consumer = require('../../utils/consumer');

test('Audit Event CRUD Cycle', async t => {

    const auditEvent = {
        performedUser: 'dilunika',
        operation: 'CREATE_INVOICE',
        time: new Date().getTime()
    };

    const createdAuditEvent = await consumer.createAuditEvent(auditEvent);
    t.not(createdAuditEvent.id, undefined, 'Created audit event should have an ID');
    t.is(createdAuditEvent.operation, auditEvent.operation);

    const auditEventById = await consumer.findAuditEventById(createdAuditEvent.id);
    t.not(auditEventById, undefined);
    t.is(auditEventById.id, createdAuditEvent.id);

    const results = await consumer.searchAuditEventsByUser(auditEvent.performedUser);
    t.not(results.length, 0);
    t.is(results[0].performedUser, createdAuditEvent.performedUser);


});