const { getSaleById } = require('../models/sales');

const checkDeleteSale = async (request, response, next) => {
  const { id } = request.params;

  const twelve = 12;
  const twentyfour = 24;
  if (id.length !== twelve && id.length !== twentyfour) return next({
    status: 422,
    message: 'Wrong sale ID format',
    code: 'invalid_data',
  });

  const result = await getSaleById(id);

  if (result === null) {
    return next({
      status: 404,
      message: 'Sale not found',
      code: 'not_found',
    });
  }

  next();
};

module.exports = checkDeleteSale;
