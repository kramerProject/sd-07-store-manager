const { getProductByID } = require('../models/products');

const checkProductId = async (request, _response, next) => {
  const { id } = request.params;

  const result = await getProductByID(id);

  if (result === null) {
    return next({
      status: 422,
      message: 'Wrong id format',
      code: 'invalid_data',
    });
  }

  next();
};

module.exports = checkProductId;
