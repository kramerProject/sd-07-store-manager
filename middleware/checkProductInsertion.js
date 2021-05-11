const { getAllProducts } = require('../models/products');

const checkProductInsertion = async (request, _response, next) => {
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

  
  if (allProducts.find((product) => product.name === name)) {
    return next({
      status: 422,
      message: 'Product already exists',
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

module.exports = checkProductInsertion;
