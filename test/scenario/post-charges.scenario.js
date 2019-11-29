/* eslint-env mocha */
require('dotenv').config();

const chai = require('chai');
const { expect } = chai;

const { ACH } = require('../../lib/client');

const {
  SANDBOX_CLIENT_ID: clientId,
  SANDBOX_CLIENT_SECRET: clientSecret,
  SANDBOX_MERCHANT_ID: merchantId,
  SANDBOX_MERCHANT_KEY: merchantKey
} = process.env;

describe('ach.postCharges()', async function () {
  it('is successful', async function () {
    const ach = new ACH({ clientId, clientSecret, merchantId, merchantKey })
    const { vaultResponse: { message } } = await ach.postTokens({
      account: {
        type: "Checking",
        routingNumber: "056008849",
        accountNumber: "12345678901234"
      }
    });
    expect(message).to.eql('SUCCESS')
  }).timeout(10000);
});
