const prompts = require('prompts');
const fs = require('fs-extra');
const _ = require('lodash');

async function main() {
  console.log('Default values are generic development credentials available for anyone to use');
  const response = await prompts([
    {
      type: 'text',
      name:'merchantId',
      message: 'What is your Paya merchant ID?',
      initial: '173859436515',
    },
    {
      type: 'text',
      name:'merchantKey',
      message: 'What is your Paya merchant key?',
      initial: 'P1J2V8P2Q3D8',
    },
    {
      type: 'text',
      name:'clientId',
      message: 'What is your Paya client ID?',
      initial: 'W8yvKQ5XbvAn7dUDJeAnaWCEwA4yXEgd',
    },
    {
      type: 'text',
      name:'clientSecret',
      message: 'What is your Paya client secret?',
      initial: 'iLzODV5AUsCGWGkr'
    }
  ]);
  await fs.writeFile('.env',
    _.join([
      `SANDBOX_MERCHANT_ID=${response.merchantId}`,
      `SANDBOX_MERCHANT_KEY=${response.merchantKey}`,
      `SANDBOX_CLIENT_ID=${response.clientId}`,
      `SANDBOX_CLIENT_SECRET=${response.clientSecret}`,
    ],
    '\n')
  );
  console.log('Finished creating .env file');
}

main();
