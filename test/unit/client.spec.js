const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { InitializationError, SchemaValidationError, NotImplementedError } = require('../../lib/util/error');

chai.use(require('sinon-chai'))

describe('client', function () {
  let sandbox;
  let Client;
  let client;
  let validate;
  let payaRequest;

  beforeEach(function () {
    sandbox = sinon.createSandbox();

    validate = sandbox.stub().callsFake((_, data) =>
      data === 'notValid'
      ? { valid: false }
      : { valid: true });
    payaRequest = sandbox.stub().resolves({ state: 'SUCCESSFUL' });
    Client = proxyquire('../../lib/client', {
      './util/schema': { validate },
      './api/request': { payaRequest },
    });

    client = new Client({
      clientId: 'ci',
      clientSecret: 'cs',
      merchantId: 'mi',
      merchantKey: 'mk',
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('constructor()', function () {
    it('should set ach on the instance', function () {
      expect(client.ach).to.not.be.undefined;
    })
  });

  describe('ach', function () {
    let ach;

    beforeEach(() => {
      ach = client.ach;
    });

    describe('constructor()', function () {
      it('should throw an error if constructed without client id', function () {
        expect(() => new Client({
          clientSecret: 'cs',
          merchantId: 'mi',
          merchantKey: 'mk',
        })).to.throw(InitializationError);
      });
  
      it('should throw an error if client id is not a string', function () {
        expect(() => new Client({
          clientId: 1,
          clientSecret: 'cs',
          merchantId: 'mi',
          merchantKey: 'mk',
        })).to.throw(InitializationError);
      });
  
      it('should throw an error if client id is empty', function () {
        expect(() => new Client({
          clientId: '',
          clientSecret: 'cs',
          merchantId: 'mi',
          merchantKey: 'mk',
        })).to.throw(InitializationError);
      });
  
      it('should throw an error if constructed without client secret', function () {
        expect(() => new Client({
          clientId: 'ci',
          merchantId: 'mi',
          merchantKey: 'mk',
        })).to.throw(InitializationError);
      });
  
      it('should throw an error if constructed without merchant id', function () {
        expect(() => new Client({
          clientId: 'ci',
          clientSecret: 'cs',
          merchantKey: 'mk',
        })).to.throw(InitializationError);
      });
  
      it('should throw an error if constructed without merchant key', function () {
        expect(() => new Client({
          clientId: 'ci',
          clientSecret: 'cs',
          merchantId: 'mi',
        })).to.throw(InitializationError);
      });

      it('should set the credential properties on the instance', function () {
        expect(ach.clientId).to.equal('ci');
        expect(ach.clientSecret).to.equal('cs');
        expect(ach.merchantId).to.equal('mi');
        expect(ach.merchantKey).to.equal('mk');
      });
    });

    describe('postTokens()', function () {
      it('should call payaRequest()', function () {
        const data = { data: 'in' };
        ach.postTokens(data);
        expect(payaRequest).to.have.been.calledOnce;
        expect(payaRequest).to.have.been.calledWith({
          method: 'POST',
          route: 'tokens',
          data,
          clientId: 'ci',
          clientSecret: 'cs',
          domain: 'https://api-cert.sagepayments.com/ach/v1',
          merchantId: 'mi',
          merchantKey: 'mk',
        });
      });
  
      it('should return a promise that resolves from the result of payaRequest()', async function () {
        const response = await ach.postTokens();
        expect(response).to.eql({ state: 'SUCCESSFUL' });
      });
  
      it('should throw an error if input validation fails', function () {
        expect(() => ach.postTokens('notValid')).to.throw(SchemaValidationError);
      });
    });
    
    describe('putToken()', function () {
      it('should call payaRequest()', function () {
        const tokenId = 'tokenId';
        const data = { data: 'in' };
        ach.putToken(tokenId, data);
        expect(payaRequest).to.have.been.calledOnce;
        expect(payaRequest).to.have.been.calledWith({
          method: 'PUT',
          route: `tokens/${tokenId}`,
          data,
          clientId: 'ci',
          clientSecret: 'cs',
          domain: 'https://api-cert.sagepayments.com/ach/v1',
          merchantId: 'mi',
          merchantKey: 'mk',
        });
      });
  
      it('should return a promise that resolves from the result of payaRequest()', async function () {
        const response = await ach.putToken();
        expect(response).to.eql({ state: 'SUCCESSFUL' });
      });
  
      it('should throw an error if input validation fails', function () {
        expect(() => ach.putToken('', 'notValid')).to.throw(SchemaValidationError);
      });
    });
  
    describe('deleteToken()', function () {
      it('should call payaRequest()', function () {
        const tokenId = 'tokenId';
        ach.deleteToken(tokenId);
        expect(payaRequest).to.have.been.calledOnce;
        expect(payaRequest).to.have.been.calledWith({
          method: 'DELETE',
          route: `tokens/${tokenId}`,
          clientId: 'ci',
          clientSecret: 'cs',
          domain: 'https://api-cert.sagepayments.com/ach/v1',
          merchantId: 'mi',
          merchantKey: 'mk',
        });
      });
  
      it('should return a promise that resolves from the result of payaRequest()', async function () {
        const response = await ach.deleteToken();
        expect(response).to.eql({ state: 'SUCCESSFUL' });
      });
    });
  
    describe('getCharges()', function () {
      it('should throw a NotImplementedError', function () {
        expect(() => ach.getCharges()).to.throw(NotImplementedError);
      });
    });
  
    describe('postCharges()', function () {
      it('should throw a NotImplementedError', function () {
        expect(() => ach.postCharges()).to.throw(NotImplementedError);
      });
    });
  });
});
