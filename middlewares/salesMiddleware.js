const { ObjectId } = require('mongodb');
const { getAllProducts } = require('../models/productsModel');
const empty = 0;
const INVALID_DATA = 422;

const quantityMiddleware = (req, res, next) => {
  const itemsSold = [...req.body];
  const isEqualOrLessThanZero = itemsSold.some((item) => item.quantity <= empty);
  const isNaN = itemsSold.some((item) => typeof item.quantity !== 'number');
  if (isEqualOrLessThanZero || isNaN) {
    return res.status(INVALID_DATA)
      .send({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      });
  }
  next();
};

const saleProductByIdMiddleware = async (req, res, next) => {
  const sales = req.body;
  const allProducts = await getAllProducts(); 
  const matchId = sales.find((prod) => {
    const id = prod.id;
    return allProducts.some((item) => ObjectId(item.id) !== ObjectId(id));
  });
  console.log({matchId});
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
