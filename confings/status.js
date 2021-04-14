const status = {
  ok: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
  stockProblem: 405,
};

const errors = {
  nameProduct: '"name" length must be at least 5 characters long',
  quntityInvalidation: '"quantity" must be larger than or equal to 1',
  quantityType: '"quantity" must be a number',
  productExists: 'Product already exists',
};

module.exports = { status, errors };