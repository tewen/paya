const _ = require('lodash');
const { payaRequest } = require('./api/request');
const { InitializationError, NotImplementedError, SchemaValidationError } = require('./util/error');
const { validate } = require('./util/schema');

const DOMAIN = 'https://api-cert.sagepayments.com';
const DOMAIN_ACH = `${DOMAIN}/ach/v1`;

const requestProperties = (instance) => _.pick(instance, ['domain', 'clientId', 'clientSecret', 'merchantId', 'merchantKey']);

class ACH {
  constructor({ clientId, clientSecret, merchantId, merchantKey }) {
    if (!_.isString(clientId) || _.isEmpty(clientId)) {
      throw new InitializationError('You must pass a clientId:String property to the client constructor.');
    }
    if (!_.isString(clientSecret) || _.isEmpty(clientSecret)) {
      throw new InitializationError('You must pass a clientSecret:String property to the client constructor.');
    }
    if (!_.isString(merchantId) || _.isEmpty(merchantId)) {
      throw new InitializationError('You must pass a merchantId:String property to the client constructor.');
    }
    if (!_.isString(merchantKey) || _.isEmpty(merchantKey)) {
      throw new InitializationError('You must pass a merchantKey:String property to the client constructor.');
    }
    this.domain = DOMAIN_ACH;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.merchantId = merchantId;
    this.merchantKey = merchantKey;
  }

  // https://developer.sagepayments.com/ach/apis/get/charges
  getCharges(/*data*/) {
    throw new NotImplementedError();
  }

  // https://developer.sagepayments.com/ach/apis/post/charges
  postCharges(data) {
    const { valid, error } = validate(require('./schemas/post-charges-request.json'), data);
    if (valid) {
      throw new NotImplementedError();
    } else {
      throw new SchemaValidationError(error);
    }
  }

  // https://developer.sagepayments.com/ach/apis/post/tokens
  postTokens(data) {
    const { valid, error } = validate(require('./schemas/post-tokens-request.json'), data);
    if (valid) {
      return payaRequest(
        _.merge(
          {
            method: 'POST',
            route: 'tokens',
            data,
          },
          requestProperties(this)
        )
      );
    } else {
      throw new SchemaValidationError(error);
    }
  }

  // https://developer.sagepayments.com/ach/apis/put/tokens/%7Breference%7D
  putToken(tokenId, data) {
    const { valid, error } = validate(require('./schemas/post-tokens-request.json'), data);
    if (valid) {
      return payaRequest(
        _.merge(
          {
            method: 'PUT',
            route: `tokens/${tokenId}`,
            data,
          },
          requestProperties(this)
        )
      );
    } else {
      throw new SchemaValidationError(error);
    }
  }

  // https://developer.sagepayments.com/ach/apis/delete/tokens/%7Breference%7D
  deleteToken(/*data*/) {
    throw new NotImplementedError();
  }
}

class Client {
  constructor({ clientId, clientSecret, merchantId, merchantKey }) {
    this.ach = new ACH({ clientId, clientSecret, merchantId, merchantKey });
  }
}

Client.ACH = ACH;

module.exports = Client;
