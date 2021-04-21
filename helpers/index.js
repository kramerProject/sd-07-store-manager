const objectError = (code, message) => {
  return {
    err: {
      code,
      message,
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
