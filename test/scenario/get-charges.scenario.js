/* eslint-env mocha */
const chai = require('chai');
const { expect } = chai;
const { ACH } = require('../../lib/client');
const credentials = require('./credentials');

describe('ach.getCharges()', async function () {
  it('is successful', async function () {
    const ach = new ACH(credentials);
    const total = Date.now();
    await ach.postCharges({
      secCode: 'PPD',
      amounts: {
        total,
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
    const { totalItemCount } = await ach.getCharges({
      totalAmount: total,
    });
    expect(totalItemCount).to.eql(1);
  }).timeout(10000);
});
