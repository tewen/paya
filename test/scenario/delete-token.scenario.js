/* eslint-env mocha */
const chai = require('chai');
const { expect } = chai;
const { ACH } = require('../../lib/client');
const credentials = require('./credentials');

describe('ach.deleteToken()', async function () {
  it('is successful', async function () {
    const ach = new ACH(credentials)
    const { vaultResponse: { data: tokenId }} = await ach.postTokens({
      account: {
        type: 'Checking',
        routingNumber: '056008849',
        accountNumber: '12345678901234',
      },
    });
    const { vaultResponse: { message } } = await ach.deleteToken(tokenId);
    expect(message).to.eql('DELETED')
  }).timeout(10000);
});
