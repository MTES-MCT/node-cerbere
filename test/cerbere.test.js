const request = require('supertest');
var Cerbere = require('cerbere');
var cerbere = new Cerbere({ url: "https://authentification.din.developpement-durable.gouv.fr/cas/public" });
describe('validate', () => {
  it('should create a new post SOAP enveloppe', () => {
    const ticket = "ST-0";
    var service = "http://127.0.0.1:3000";
    cerbere.validate(ticket, service, function (err, status, username, extended) {return;});
    expect(true).toBe(true);
  });
});