/* eslint-env mocha */
const chai = require('chai');
const { expect } = chai;
const { ACH } = require('../../lib/client');
const credentials = require('./credentials');

describe('ach.postCharges()', async function () {
  it('is successful', async function () {
    const ach = new ACH(credentials);
    const { status } = await ach.postCharges({
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
    });
    expect(status).to.eql('Approved');
  }).timeout(10000);
});
