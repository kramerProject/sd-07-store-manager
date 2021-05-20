const numbers = {
  CINCO: 5,
  ZERO: 0
};

const validateFields = (name, quantity) => {
  if (name.length <= numbers.CINCO) {
    throw new Error('"name" length must be at least 5 characters long');
  }
  if (parseInt(quantity) <= numbers.ZERO) {
    throw new Error('"quantity" must be larger than or equal to 1');
  }
  if (isNaN(parseInt(quantity))) {
    throw new Error('"quantity" must be a number');
  }
  return true;
};

module.exports = {
  validateFields,
};
