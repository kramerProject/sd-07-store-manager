const salesService = require('../services/SalesService');

const UNPROCESSABLE_ENTITY = 422;

const saleVerify = (req, res, next) => {
  const { body: itens } = req;
  (salesService.typeVerify(itens) && salesService.quantityVerify(itens))
    ? next()
    : res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
};

module.exports = {
  saleVerify,
};
