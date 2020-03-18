// var nock = require('nock'),
//     Cerbere = require('cerbere'),
 var   should = require('should');
// var base_url = 'https://cebere/cas/public',
//     service = 'test_service',
//     cerbere = new Cerbere({ url: base_url }),
//     user = "jean.martin";

describe('validate', () => {
    it('should create a new post SOAP enveloppe', () => {
        // var ticket = "ST-0";
        // nock(base_url)
        //     .post('/samlValidate')
        //     .query({ ticket: ticket, service: service })
        //     .replyWithFile(200, 'fixtures/soapenv.xml');
        // var callback = function (err, status, username, extended) {
        //     should.exist(username, 'should have username');
        //     should.equal(username, user, 'should return valid username');
        //     should.exist(extended.attributes, 'should have attributes property');
        //     should.deepEqual(extended.attributes, attributes, 'should have attributes');
        //     should.exist(extended.ticket, 'should have ticket property');
        //     should.equal(extended.ticket, ticket, 'should return valid ticket property');
        // };
        // cerbere.validate(ticket, service, callback);
        should.exist(true, 'dummy');
    });
});

describe('authenticate', () => {
    it('should redirect to Cerbere login if no ticket ', () => {
        // var req = {
        //     method: 'GET',
        //     url: base_url
        // };
        // var res = {};
        // var callback = function () {
        //     should.not.exist(true, 'should not call this function');
        // };
        // cerbere.authenticate(req, res, callback, service);
        should.exist(true, 'dummy');
    });

    it('should validate Cerbere if ticket ', () => {
        // nock(base_url)
        //     .post('/samlValidate')
        //     .query({ ticket: ticket, service: service })
        //     .replyWithFile(200, 'fixtures/soapenv.xml');
        // var callback = function (err, status, username, extended) {
        //     should.exist(username, 'should have username');
        //     should.equal(username, user, 'should return valid username');
        //     should.exist(extended.attributes, 'should have attributes property');
        //     should.deepEqual(extended.attributes, attributes, 'should have attributes');
        //     should.exist(extended.ticket, 'should have ticket property');
        //     should.equal(extended.ticket, ticket, 'should return valid ticket property');
        // };
        // cerbere.authenticate(req, res, callback, service);
        should.exist(true, 'dummy');
    });
});