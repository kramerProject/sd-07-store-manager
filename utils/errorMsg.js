const errorReturn = (code, msg) => {
  return {
    'err': {
      'code': `${code}`,
      'message': `${msg}`
    }
  };
};

const code = {
  invData: 'invalid_data',
  notFound: 'not_found',
  stockProblem: 'stock_problem',
};

const msg = {
  wrongProdIdFormat: 'Wrong id format',
  wrongSaleAmount: 'Such amount is not permitted to sell',
  wrongSaleIdFormat: 'Wrong sale ID format',
  saleNotFound: 'Sale not found',
  shortName: '"name" length must be at least 5 characters long',
  nameExists: 'Product already exists',
  lessThanZero: '"quantity" must be larger than or equal to 1',
  isString: '"quantity" must be a number',
  wrongIdOrQty: 'Wrong product ID or invalid quantity'
};

module.exports = {
  errorReturn,
  code,
  msg
};
