/* eslint-env mocha */
const chai = require('chai');
const { expect } = chai;
const { ACH } = require('../../lib/client');
const credentials = require('./credentials');

describe('ach.putToken()', async function () {
  it('is successful', async function () {
    const ach = new ACH(credentials)
    const { vaultResponse: { data: tokenId }} = await ach.postTokens({
      account: {
        type: 'Checking',
        routingNumber: '056008849',
        accountNumber: '12345678901234',
      },
    });
    const { vaultResponse: { message } } = await ach.putToken(tokenId, {
      account: {
        type: 'Savings',
        routingNumber: '056008849',
        accountNumber: '12345678901234',
      },
    });
    expect(message).to.eql('SUCCESS')
  }).timeout(10000);
});
