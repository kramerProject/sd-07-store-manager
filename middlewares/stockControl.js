const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const { NOT_FOUND } = require('../utils/statusCode.json');

const stockControl = async (req, res, next) => {
  const { method } = req;
  const INCREASE = 1;
  const DECREASE = -1;
  let products = [];
  let operation = 1;

  if (method === 'DELETE') {
    operation = INCREASE;
    const { id } = req.params;
    const { itensSold } = await salesModel.getById(id);
    products = itensSold;
  } else {
    operation = DECREASE;
    products = req.body;
  }

  try {
    products.forEach(async ({ quantity, productId }) => {
      let {_id: id, name, quantity: quant} = await productsModel.getById(productId);
      quant = quant + operation * quantity;

      const err = new Error();
      err.code = 'stock_problem';
      err.message = 'Such amount is not permitted to sell';

      if (quant < 1) {
        res.status(NOT_FOUND).json({ err });
        throw err;
        // next(err);
        // return; 
      }

      await productsModel.update(id, name, quant);
      return;
    });
  } catch (error) {
    next(error);
    return;
  }
  next();
  return;
};

module.exports = stockControl;

