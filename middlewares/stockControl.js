const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

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
  console.log(products);

  products.forEach(async ({ quantity, productId }) => {
    try {
      let {_id: id, name, quantity: quant} = await productsModel.getById(productId);
      quant = quant + operation * quantity;
      console.log(name);
      console.log(quant);
      await productsModel.update(id, name, quant);
    } catch (error) {
      next(error);
      return;
    }
    return;
  });
  next();
};

module.exports = stockControl;

