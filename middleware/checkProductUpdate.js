const { getAllProducts } = require('../models/products');

const checkProductUpdate = async (request, _response, next) => {
  const { name, quantity } = request.body;

  const allProducts = await getAllProducts();

  const five = 5;
  if (name.length < five) {
    return next({
      status: 422,
      message: '"name" length must be at least 5 characters long',
      code: 'invalid_data',
    });
  }
  
  if (typeof quantity !== 'number') {
    return next({
      status: 422,
      message: '"quantity" must be a number',
      code: 'invalid_data',
    });
  }
  
  if (quantity < 1) {
    return next({
      status: 422,
      message: '"quantity" must be larger than or equal to 1',
      code: 'invalid_data'
    });
  }

  next();
};

module.exports = checkProductUpdate;
