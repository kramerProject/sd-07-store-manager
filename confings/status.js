const status = {
  created: 201,
  unprocessableEntity: 422,
};

const errors = {
  nameProduct: '"name" length must be at least 5 characters long',
  quntityInvalidation: '"quantity" must be larger than or equal to 1',
  quantityType: '"quantity" must be a number',
  productExists: 'Product already exists',
};

module.exports = { status, errors };