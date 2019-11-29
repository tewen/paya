const Ajv = require('ajv');
const _ = require('lodash');

function validate(schema, data) {
  const ajv = new Ajv();
  const validator = ajv.compile(schema);
  const valid = validator(data);
  return _.pickBy({
    valid,
    error: !valid ? ajv.errorsText(validator.errors) : undefined
  });
}

module.exports = {
  validate
};
