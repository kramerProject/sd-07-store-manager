const {unprocessableEntity} = require('../messagesCodes');
const maxlengthName = 5;

const errorsName = {
  err: {
    code: 'invalid_data',
    message :'"name" length must be at least 5 characters long'
  },
};

const isBlank = (value) => !value;
const isLengthLetterThan = (value, min) => (value.length < min);

const validateName = (name) => {
  switch (true) {
  case isLengthLetterThan(name, maxlengthName): return {
    code: unprocessableEntity,
    message: errorsName
  };
  default: return false;
  }
};

module.exports = {
  validateName,
};
