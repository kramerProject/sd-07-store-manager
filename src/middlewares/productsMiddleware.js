const { productsService } = require('../services');
const { createProduct, readyProducts } = productsService;

const UNPROCESSABLE = 422;
const CODE = 'invalid_data';

const validateProductNameAndQuantity = async (req, _res, next) => {
  try {
    const { name, quantity } = req.body;

    const productsList = await readyProducts();

    if (!productsList) throw new Error('Products undefined');
    if (!name) throw new Error('Name not exists');
    if (typeof name !== 'string')
    throw new Error('"name" must be a string');
    if (name.length < 5)
      throw new Error('"name" length must be at least 5 characters long');

    const checkNameExists = productsList.some((product) => product.name === name);

    if (checkNameExists) throw new Error('Product already exists');
    if (quantity === undefined) throw new Error('Quantity not exists');
    if (typeof quantity !== 'number')
      throw new Error('"quantity" must be a number');
    if (quantity <= 0)
      throw new Error('"quantity" must be larger than or equal to 1');

    next();
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      code: CODE,
      message: error.message,
    });
  }
};

module.exports = {
  validateProductNameAndQuantity,
};
