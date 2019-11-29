const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { APIError } = require('../../../lib/util/error');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('api/request', function () {
  let sandbox;
  let requestLib;
  let requestHelpers;
  let request;
  let requestPayload;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    
    requestLib = sandbox.stub().resolves({ state: 'SUCCESSFUL' });
    requestHelpers = {
      getAuthorization: sandbox.stub().returnsArg(0),
      getNonce: sandbox.stub().returns('nonce'),
      getRoute: sandbox.stub().callsFake(({ route, domain }) => `${domain}${route}`),
      getTimestamp: sandbox.stub().returns('timestamp'),
    };
    request = proxyquire('../../../lib/api/request', {
      'request-promise-native': requestLib,
      './helpers/request': requestHelpers
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('payaRequest()', function () {
    beforeEach(function () {
      request.payaRequest({
        method: 'POST',
        route: '/dots/sticks/bricks/78',
        domain: 'd',
        clientId: 'c',
        clientSecret: 'c',
        merchantId: 'm',
        merchantKey: 'm',
        data: 'd',
      });
      requestPayload = requestLib.args[0][0];
    });

    it('should call request with a POST method', function () {
      expect(requestLib).to.have.been.calledOnce;
      expect(requestPayload.method).to.equal('POST');
    });

    it('should call request with a uri', function () {
      expect(requestLib).to.have.been.calledOnce;
      expect(requestPayload.uri).to.equal('d/dots/sticks/bricks/78');
    });

    it('should call request with json flag', function () {
      expect(requestLib).to.have.been.calledOnce;
      expect(requestPayload.json).to.equal(true);
    });

    it('should call request with a body', function () {
      expect(requestLib).to.have.been.calledOnce;
      expect(requestPayload.body).to.equal('d');
    });

    it('should apply the correct headers', function () {
      expect(requestPayload.headers).to.eql({
        clientId: 'c',
        merchantId: 'm',
        merchantKey: 'm',
        nonce: 'nonce',
        timestamp: 'timestamp',
        authorization: {
          method: 'POST',
          uri: 'd/dots/sticks/bricks/78',
          data: 'd',
          merchantId: 'm',
          nonce: 'nonce',
          timestamp: 'timestamp',
          clientSecret: 'c',
        },
        'content-type': 'application/json',
      });
    });

    it('should call getAuthorization()', function () {
      expect(requestHelpers.getAuthorization).to.have.been.calledOnce;
    });

    it('should call getNonce()', function () {
      expect(requestHelpers.getNonce).to.have.been.calledOnce;
    });

    it('should call getRoute()', function () {
      expect(requestHelpers.getRoute).to.have.been.calledOnce;
    });
    
    it('should call getTimestamp()', function () {
      expect(requestHelpers.getTimestamp).to.have.been.calledOnce;
    });

    it('should return the response of the request', async function () {
      const response = await request.payaRequest({});
      expect(response).to.eql({ state: 'SUCCESSFUL' });
    });

    it('should throw an error when request fails', function () {
      requestLib = sandbox.stub().rejects();
      request = proxyquire('../../../lib/api/request', {
        'request-promise-native': requestLib,
        './helpers/request': requestHelpers
      });
      return expect(request.payaRequest({})).to.be.rejectedWith(APIError);
    });
  });
});
