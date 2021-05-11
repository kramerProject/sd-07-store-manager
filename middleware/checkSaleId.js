const { getSaleById } = require('../models/sales');

const checkSaleId = async (request, _response, next) => {
  const { id } = request.params;

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
