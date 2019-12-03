const { createHmac } = require('crypto');
const uuidv4 = require('uuid/v4');

const getAuthorization = ({
  method,
  uri,
  data,
  merchantId,
  nonce,
  timestamp,
  clientSecret,
}) => {
  const hmac = createHmac('sha512', clientSecret);
  const bodyForHmac = data ? JSON.stringify(data) : '';
  hmac.update(method + uri + bodyForHmac + merchantId + nonce + timestamp);
  return hmac.digest().toString('base64');
};

const getNonce = () => uuidv4();

const getRoute = ({ route, domain }) => `${domain}/${route}`;

const getTimestamp = () => String(Math.floor(Date.now() / 1000));

module.exports = {
  getAuthorization,
  getNonce,
  getRoute,
  getTimestamp,
};
