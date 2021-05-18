// const { ObjectId } = require('mongodb');
const { getAllProducts } = require('../models/productsModel');
const empty = 0;
const INVALID_DATA = 422;

const quantityMiddleware = (req, res, next) => {
  const itemsSold = [...req.body];
  const isEqualOrLessThanZero = itemsSold.some((item) => item.quantity <= empty);
  if (isEqualOrLessThanZero) {
    return res.status(INVALID_DATA)
      .send({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      });
  }
  const isNaN = itemsSold.some((item) => typeof item.quantity !== 'number');
  if (isNaN) {
    return res.status(INVALID_DATA)
      .send({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        }
      });
  }
  next();
};

const saleProductByIdMiddleware = async (req, res, next) => {
  const sales = [...req.params];
  const allProducts = await getAllProducts(); 
  const matchId = sales.some((prod) => {
    const id = prod.id;
    const searchingId = allProducts.find((item) => item.id === id);
    if (!searchingId) {
      return true;
    }
    return false; // retorno se houver match
  });
  if (!matchId) {
    return res.status(INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    });
  }
  next();
};

module.exports = {
  quantityMiddleware,
  saleProductByIdMiddleware,
};
