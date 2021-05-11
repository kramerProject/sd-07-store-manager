const { getSaleById } = require('../models/sales');

const checkSaleId = async (request, _response, next) => {
  const { id } = request.params;

  const twelve = 12;
  const twentyfour = 24;
  if (id.length !== twelve && id.length !== twentyfour) return next({
    status: 404,
    message: 'Sale not found',
    code: 'not_found',
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

module.exports = checkSaleId;
