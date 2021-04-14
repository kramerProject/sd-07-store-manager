const productsModel = require('../models/productsModel');
const unprocessableEntityStatus = 422;
const errorObj = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const verifyName = async (name, res) => {
  const FIVE = 5;

  if (typeof name !== 'string' || name.length <= FIVE) {
    errorObj.err.message = '"name" length must be at least 5 characters long';
    return res.status(unprocessableEntityStatus).json(errorObj);
  };

  const productsArray = await productsModel.getAllProducts();
  const productExist = productsArray.find((item) => item.name === name);

  if (productExist) {
    errorObj.err.message = 'Product already exists';
    return res.status(unprocessableEntityStatus).json(errorObj);
  }
};

const verifyQuantity = (quantity, res) => {
  const ZERO = 0;

  if (quantity <= ZERO) {
    errorObj.err.message = '"quantity" must be larger than or equal to 1';
    return res.status(unprocessableEntityStatus).json(errorObj);
  }

  if (typeof quantity !== 'number') {
    errorObj.err.message = '"quantity" must be a number';
    return res.status(unprocessableEntityStatus).json(errorObj);
  }
};

const newProductMiddleware = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const validQuantity = verifyQuantity(quantity, res);
    const validName = await verifyName(name, res);

    if(validQuantity || validName) return;
  } catch (err) {
    throw new Error(err);
  }

  next();
};

module.exports = newProductMiddleware;
