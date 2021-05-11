const { ObjectId } = require('mongodb');
const { getAllProducts } = require('../models/products');

const errorCode = {
  status: 422,
  message: 'Wrong product ID or invalid quantity',
  code: 'invalid_data',
};

const zero = 0;

const checkNewSale = async (request, response, next) => {
  const productsArray = request.body;

  const allProducts = await getAllProducts();
  let result;

  productsArray.map(async (item) => {
    const matchID = allProducts
      .find((product) => product._id == item.productId);

    if (matchID === undefined) result = errorCode;

    if (typeof item.quantity !== 'number') result = errorCode;
    
    if (item.quantity < 1) result = errorCode;

    if (matchID.quantity - item.quantity < zero) result = {
      status: 404,
      message: 'Such amount is not permitted to sell',
      code: 'stock_problem',
    };
  });

  if (result) return next(result);
  next();
};

module.exports = checkNewSale;
