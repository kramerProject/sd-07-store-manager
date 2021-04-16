const productExistsError = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const productNameLengthError = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};

const quantityLargerThanZeroError = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};

const quantityMustBeANumberError = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

module.exports = {
  productExistsError,
  productNameLengthError,
  quantityMustBeANumberError,
  quantityLargerThanZeroError,
};
