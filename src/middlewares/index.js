const { productsModel } = require('../models');
const { httpStatusCode } = require('../../constants');
const { saleIdValidate } = require('../validations/sales');
const MIN_STOCK = 0;

const stockAvalible = async (req, res, next) => {
  const salesInfo = req.body;
  try {
    for (sale of salesInfo) {
      const { productId, quantity } = sale;
      saleIdValidate(productId);
      const produc = await productsModel.getProductById(productId);
      const newStock = {
        name: produc.name,
        quantity: produc.quantity - quantity,
      };
      if(newStock.quantity < MIN_STOCK)
        throw new Error('Such amount is not permitted to sell');
      await productsModel.updateProduct(productId, newStock.name, newStock.quantity);
    }
    next();
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.NOT_FOUND,
      code: 'stock_problem',
      message: error.message,
    });
  }
};

const updateStock = async (req, res, next) => {
  console.log(req.body);
  next();
};

module.exports = {
  stockAvalible,
  updateStock,
};
