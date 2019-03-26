const prompts = require('prompts');
const fs = require('fs-extra');
const _ = require('lodash');

async function main() {
  const response = await prompts([
    {
      type: 'text',
      name:'apiKey',
      message: 'What is your Paya sandbox API key?'
    },
    {
      type: 'text',
      name:'merchantId',
      message: 'What is your Paya merchant ID?'
    },
    {
      type: 'text',
      name:'merchantKey',
      message: 'What is your Paya merchant key?'
    }
  ]);
  await fs.writeFile('.env',
    _.join([`SANDBOX_API_KEY=${response.apiKey}`, `SANDBOX_MERCHANT_ID=${response.merchantId}`, `SANDBOX_MERCHANT_KEY=${response.merchantKey}`], '\n')
  );
  console.log('Finished creating .env file');
}

main();
