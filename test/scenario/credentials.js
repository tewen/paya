require('dotenv').config();

const {
  SANDBOX_CLIENT_ID: clientId,
  SANDBOX_CLIENT_SECRET: clientSecret,
  SANDBOX_MERCHANT_ID: merchantId,
  SANDBOX_MERCHANT_KEY: merchantKey
} = process.env;

module.exports = {
  clientId,
  clientSecret,
  merchantId,
  merchantKey,
};