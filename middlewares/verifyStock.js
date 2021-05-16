const modelProduct = require('../models/productsModel');

const zero = 0;
const not_found = 404;

const verifyStock = async (req, res, next) => {
  const itensSold = req.body;

  for (let index = zero; index < itensSold.length; index += 1) {
    const { quantity } = await modelProduct.findId(itensSold[index].productId);
    if (itensSold[index].quantity > quantity)
      return res.status(not_found).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell'
        }
      });
  }
  next();
};

module.exports = verifyStock;
