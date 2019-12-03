const { expect } = require('chai');
const { validate } = require('../../../lib/util/schema');

describe('util/schema', function () {
  describe('validate()', function () {
    let schema;

    describe('post-tokens-request', function () {
      beforeEach(function () {
        schema = require('../../../lib/schemas/post-tokens-request.json');
      });
      
      it('validates according to schema', function () {
        expect(validate(
          schema,
          {
            account: {
              type: 'Checking',
              routingNumber: '056008849',
              accountNumber: '12345678901234',
            }
          }).valid).to.eql(true);
      });

      it('does not validate according to schema', function () {
        expect(validate(
          schema,
          {
            account: {
              routingNumber: '056008849',
              accountNumber: '12345678901234',
            }
          }).valid).to.eql(undefined);
      });

      it('does not validate according to schema with meaningful error', function () {
        expect(validate(
          schema,
          {
            account: {
              routingNumber: '056008849',
              accountNumber: '12345678901234',
            }
          }).error).to.eql('data.account should have required property \'type\'');
      });
    });

    describe('post-charges-request', function () {
      beforeEach(function () {
        schema = require('../../../lib/schemas/post-charges-request.json');
      });
      
      it('validates according to schema', function () {
        expect(validate(
          schema,
          {
            secCode: 'PPD',
            amounts: {
              total: 1,
            },
            account: {
              type: 'Checking',
              routingNumber: '056008849',
              accountNumber: '12345678901234',
            },
            billing: {
              name: {
                first: 'first',
                last: 'last',
              },
              address: 'address',
              city: 'city',
              state: 'state',
              postalCode: 'postalCode',
            },
          }).valid).to.eql(true);
      });

      it('does not validate according to schema', function () {
        expect(validate(
          schema,
          {}).valid).to.eql(undefined);
      });

      it('does not validate according to schema with meaningful error', function () {
        expect(validate(
          schema,
          {
            secCode: 'PPD',
            amounts: {
              total: 1,
            },
            account: {
              type: 'Checking',
              routingNumber: '056008849',
              accountNumber: '12345678901234',
            },
            billing: {
              name: {
                last: 'last',
              },
              address: 'address',
              city: 'city',
              state: 'state',
              postalCode: 'postalCode',
            },
          }).error).to.eql('data.billing.name should have required property \'first\'');
      });
    });

    describe('get-charges-request', function () {
      beforeEach(function () {
        schema = require('../../../lib/schemas/get-charges-request.json');
      });
      
      it('validates according to schema', function () {
        expect(validate(
          schema,
          {
            totalAmount: 1,
          }).valid).to.eql(true);
      });

      it('validates empty query according to schema', function () {
        expect(validate(
          schema,
          {}).valid).to.eql(true);
      });

      it('does not validate according to schema', function () {
        expect(validate(
          schema,
          {
            totalAmount: 'amount',
          }).valid).to.eql(undefined);
      });

      it('does not validate according to schema with meaningful error', function () {
        expect(validate(
          schema,
          {
            totalAmount: 'amount',
          }).error).to.eql('data.totalAmount should be number');
      });
    });
  });
});
