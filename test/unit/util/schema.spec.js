const { expect } = require('chai');
const { validate } = require('../../../lib/util/schema');

describe('util/schema', function () {
  describe('validate()', function () {
    let schema;

    describe('post-tokens-request', function () {
      beforeEach(function () {
        schema = require('../../../lib/schemas/post-tokens-request.json')
      });
      
      it('validates according to schema', function () {
        expect(validate(
          schema,
          {
            account: {
              type: "Checking",
              routingNumber: "056008849",
              accountNumber: "12345678901234"
            }
          }).valid).to.eql(true)
      })

      it('does not validate according to schema', function () {
        expect(validate(
          schema,
          {
            account: {
              routingNumber: "056008849",
              accountNumber: "12345678901234"
            }
          }).valid).to.eql(undefined)
      })

      it('does not validate according to schema with meaningful error', function () {
        expect(validate(
          schema,
          {
            account: {
              routingNumber: "056008849",
              accountNumber: "12345678901234"
            }
          }).error).to.eql('data.account should have required property \'type\'')
      })
    });
  });
});
