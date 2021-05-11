const { getProductByID } = require('../models/products');

const checkProductId = async (request, _response, next) => {
  const { id } = request.params;

  const twelve = 12;
  const twentyfour = 24;
  if (id.length !== twelve && id.length !== twentyfour) return next({
    status: 422,
    message: 'Wrong id format',
    code: 'invalid_data',
  });

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
