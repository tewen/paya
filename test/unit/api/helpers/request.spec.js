const { expect } = require('chai');
const { getAuthorization, getNonce, getRoute, getTimestamp } = require('../../../../lib/api/helpers/request');

describe('api/helpers/request', function () {
  describe('getAuthorization()', function () {
    const hmacKey = 'c5DAKh3a6fhf6ZicZMo6lVn/Wj8808Ni2Sg+eui/0m1mNrYxdLXLXeGcEbxZxXpViEjfLKuLP+a2by1lIoEr/Q==';
    
    it('should return hmac key', function () {
      expect(getAuthorization({
        method: 'm',
        uri: 'u',
        data: 'd',
        merchantId: 'm',
        nonce: 'n',
        timestamp: 't',
        clientSecret: 'c',
      })).to.equal(hmacKey);
    });

    it('should return a different hmac key', function () {
      expect(getAuthorization({
        method: 'something changed',
        uri: 'u',
        data: 'd',
        merchantId: 'm',
        nonce: 'n',
        timestamp: 't',
        clientSecret: 'c',
      })).to.not.equal(hmacKey);
    });
  });

  describe('getNonce()', function () {
    it('should return a different nonce on subsequent call', function () {
      expect(getNonce()).to.not.eql(getNonce());
    });
  });

  describe('getRoute()', function () {
    it('should build complete route from route and domain', function () {
      expect(getRoute({ route: 'r', domain: 'd' })).to.eql('d/r');
    });
  });
  
  describe('getTimestamp()', function () {
    it('should get epoch timestamp in seconds', function () {
      expect(getTimestamp().length).to.eql(10);
    });

    it('should get epoch timestamp as string', function () {
      expect(typeof getTimestamp()).to.eql('string');
    });
  });
});
