const saleModel = require('../models/saleModel');

const saleServices = require('../services/saleServices');

const { C_404 } = saleServices.statusHttp;

const saleIdExistisMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const sales = await saleModel.getSaleById(id);
  try {
    if (sales === null) {
      return res
        .status(C_404)
        .send({
          err: {
            code: 'not_found',
            message: 'Sale not found', }
        });
    }
    next();
  } catch (error) {
    next({
      err: {
        code: error.code,
        message: error.message,
      }
    });
  };
};

module.exports = saleIdExistisMiddleware;