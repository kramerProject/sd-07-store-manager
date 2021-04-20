const objectError = (text) => {
  return {
    err: {
      code: 'invalid_data',
      message : text
    }
  };
};

const isQuantityLetterThan = (value, min) => (value <= min);
const isString = (value) => (typeof value === 'string');
const isLengthLetterThan = (value, min) => (value.length < min);

module.exports = {
  objectError,
  isQuantityLetterThan,
  isString,
  isLengthLetterThan
};
