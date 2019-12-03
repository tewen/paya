const _ = require('lodash');
const qs = require('qs');
const request = require('request-promise-native');
const { APIError } = require('../util/error');
const { getAuthorization, getNonce, getRoute, getTimestamp } = require('./helpers/request');

async function payaRequest({
  method,
  route,
  query,
  domain,
  clientId,
  clientSecret,
  merchantId,
  merchantKey,
  data,
}) {
  try {
    const uri = _.chain([
      getRoute({ route, domain }),
      !_.isEmpty(query) ? qs.stringify(query) : undefined
    ]).compact().join('?').value();
    const nonce = getNonce();
    const timestamp = getTimestamp();
    const authorization = getAuthorization({
      method,
      uri,
      data,
      merchantId,
      nonce,
      timestamp,
      clientSecret,
    });
    const response = await request({
      method,
      uri,
      headers: {
        clientId,
        merchantId,
        merchantKey,
        nonce,
        timestamp,
        authorization,
        'content-type': 'application/json',
      },
      json: true,
      body: data,
    });
    return response;
  } catch (e) {
    throw new APIError(_.get(e, 'message', e));
  }
}

module.exports = {
  payaRequest,
};
