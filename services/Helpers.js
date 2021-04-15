const compare ={
  minSize: 5,
  zeroQuantity: 0,
  hexObjectedId: 24,
};

const status = {
  code200: 200,
  code201: 201,
  code404: 404,
  code422: 422,
};

const message = {
  nameLength: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists',
  greaterThanZero: '"quantity" must be larger than or equal to 1',
  mustBeNumber: '"quantity" must be a number',
  wrongIdFormat: 'Wrong id format',
  invalidyQuantity: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
  wrongSaleId: 'Wrong sale ID format',
};

const greaterThan = (value, number) => (Math.floor(value) <= number);

const mustBeNumber = (value) => (typeof value !== 'number');

const responseWith = (code, message, response) => {
  const err = {
    err: {
      code: 'invalid_data',
      message
    },
  };
  return response.status(code).json(err);
};

const responseWithNotFound = (response) => {
  return response.status(status.code404)
    .json({
      err: {
        code: 'not_found',
        message: message.saleNotFound
      }
    });
};

const messageError = (code, message) => ({ 
  code,
  err: {
    code: 'invalid_data',
    message
  }
});

module.exports = {
  compare,
  status,
  message,
  greaterThan,
  mustBeNumber,
  responseWith,
  responseWithNotFound,
  messageError,
};
