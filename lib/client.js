const { validate } = require('./util/schema');
const { SchemaValidationError } = require('./util/error');

class ACH {
  // https://developer.sagepayments.com/ach/apis/get/charges
  getCharges(data) {
    // This call should be implemented using the same form of schema validation as postCharges(data)
  }

  // https://developer.sagepayments.com/ach/apis/post/charges
  postCharges(data) {
    const { valid, error } = validate(require('./schemas/post-charges-request.json'), data);
    if (valid) {

    } else {
      throw new SchemaValidationError(error);
    }
  }

  // https://developer.sagepayments.com/ach/apis/post/tokens
  postTokens(data) {
    // This call should be implemented using the same form of schema validation as postCharges(data)
  }

  // https://developer.sagepayments.com/ach/apis/put/tokens/%7Breference%7D
  putToken(data) {
    // This call should be implemented using the same form of schema validation as postCharges(data)
  }

  // https://developer.sagepayments.com/ach/apis/delete/tokens/%7Breference%7D
  deleteToken(data) {
    // This call should be implemented using the same form of schema validation as postCharges(data)
  }
}

class Client {
  constructor() {
    this.ach = new ACH();
  }
}

Client.ACH = ACH;

module.exports = Client;
